import React, { useState } from 'react';

const HashDisplay = ({ hash, isAddress = false, copyFull = true }) => {
    const [copied, setCopied] = useState(false);

    if (!hash) return <span>-</span>;

    const displayHash = (hash.length > 20) 
        ? `${hash.substring(0, 10)}...${hash.substring(hash.length - 7)}` 
        : hash;

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(copyFull ? hash : displayHash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            <span>{displayHash}</span>
            <button 
                onClick={handleCopy} 
                className="btn-ghost" 
                style={{ 
                    padding: '2px 6px', 
                    fontSize: '10px', 
                    height: '24px', 
                    borderRadius: '4px', 
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-glass)'
                }}
                title="Copy to clipboard"
            >
                {copied ? <span role="img" aria-label="check">✓</span> : <span role="img" aria-label="clipboard">📋</span>}
            </button>
            {copied && (
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--bg-glass-hover)',
                    color: 'var(--text-primary)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-glass)',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    animation: 'fadeInUp 0.2s ease backwards'
                }}>
                    Copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default HashDisplay;
