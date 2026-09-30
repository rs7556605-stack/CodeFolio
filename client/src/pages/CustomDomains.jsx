
import { useEffect, useState } from "react";
import API_URL from "../services/api";
import "./CustomDomains.css";

function CustomDomains() {
  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [verifyingId, setVerifyingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verification, setVerification] = useState(null);

  const token = localStorage.getItem("token");

  const requestHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  async function fetchDomains() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/domains`, {
        headers: requestHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load domains");
      }

      setDomains(data.domains || []);
    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDomains();
    // Load domains when this page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddDomain(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setVerification(null);

    if (!domainInput.trim()) {
      setError("Please enter a domain name.");
      return;
    }

    setAdding(true);

    try {
      const response = await fetch(`${API_URL}/api/domains`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          domain: domainInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add domain");
      }

      setMessage(data.message || "Domain added successfully.");
      setDomainInput("");
      setVerification(data.verification || null);

      await fetchDomains();
    } catch (err) {
      setError(err.message || "Unable to add domain");
    } finally {
      setAdding(false);
    }
  }

  async function handleVerify(domain) {
    setMessage("");
    setError("");
    setVerifyingId(domain._id);

    try {
      const response = await fetch(
        `${API_URL}/api/domains/${domain._id}/verify`,
        {
          method: "POST",
          headers: requestHeaders,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Domain verification is still pending."
        );
      }

      setMessage(data.message || "Domain verified successfully.");
      await fetchDomains();
    } catch (err) {
      setError(err.message || "Verification failed");
      await fetchDomains();
    } finally {
      setVerifyingId("");
    }
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage("Copied to clipboard.");
      setError("");
    } catch {
      setError("Copy failed. Please copy the text manually.");
    }
  }

  return (
    <main className="custom-domains-page">
      <header className="domains-header">
        <div>
          <p className="domains-eyebrow">CODEFOLIO PRO</p>
          <h1>Custom Domains</h1>
          <p>
            Manage your domain names and verify domain ownership.
          </p>
        </div>

        <span className="domains-badge">Domain Management</span>
      </header>

      {message && (
        <div className="domains-alert success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="domains-alert error" role="alert">
          {error}
        </div>
      )}

      <section className="domains-card">
        <h2>Add a custom domain</h2>
        <p>
          Enter a domain you own, for example, portfolio.example.com.
        </p>

        <form onSubmit={handleAddDomain} className="domain-add-form">
          <input
            type="text"
            value={domainInput}
            onChange={(event) => setDomainInput(event.target.value)}
            placeholder="portfolio.yourdomain.com"
            aria-label="Domain name"
            autoComplete="url"
            required
          />

          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Domain"}
          </button>
        </form>
      </section>

      {verification && (
        <section className="domains-card verification-card">
          <h2>DNS verification instructions</h2>
          <p>
            Add the following TXT record in your domain provider's DNS
            settings. Keep the value private.
          </p>

          <div className="dns-field">
            <span>Record type</span>
            <strong>{verification.type || "TXT"}</strong>
          </div>

          <div className="dns-field">
            <span>Host / Name</span>
            <code>{verification.host}</code>
            <button
              type="button"
              onClick={() => copyText(verification.host)}
            >
              Copy
            </button>
          </div>

          <div className="dns-field">
            <span>TXT value</span>
            <code className="dns-value">{verification.value}</code>
            <button
              type="button"
              onClick={() => copyText(verification.value)}
            >
              Copy
            </button>
          </div>

          {verification.instructions && (
            <p className="dns-instructions">
              {verification.instructions}
            </p>
          )}
        </section>
      )}

      <section className="domains-card">
        <div className="domains-list-heading">
          <div>
            <h2>Your domains</h2>
            <p>View and verify your added domains.</p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={fetchDomains}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="domains-empty">Loading domains...</p>
        ) : domains.length === 0 ? (
          <div className="domains-empty">
            <h3>No domains added yet</h3>
            <p>Add a domain above to get started.</p>
          </div>
        ) : (
          <div className="domains-list">
            {domains.map((domain) => (
              <article className="domain-item" key={domain._id}>
                <div className="domain-item-info">
                  <h3>{domain.domain}</h3>
                  <span
                    className={`domain-status ${
                      domain.status === "verified"
                        ? "verified"
                        : "pending"
                    }`}
                  >
                    {domain.status || "pending"}
                  </span>
                </div>

                {domain.status !== "verified" && (
                  <button
                    type="button"
                    onClick={() => handleVerify(domain)}
                    disabled={verifyingId === domain._id}
                  >
                    {verifyingId === domain._id
                      ? "Checking DNS..."
                      : "Verify DNS"}
                  </button>
                )}

                {domain.status === "verified" && (
                  <span className="verified-label">
                    Ownership verified
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="domains-note">
        DNS verification confirms domain ownership. It does not by itself
        connect the domain to your portfolio or configure HTTPS.
      </p>
    </main>
  );
}

export default CustomDomains;