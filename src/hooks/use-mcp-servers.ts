import { useState, useEffect } from 'react';
import { McpServerConfig } from '@/lib/mcp-config';

export function useMcpServers() {
    const [servers, setServers] = useState<McpServerConfig[]>([]);

    useEffect(() => {
        const loadServers = () => {
            try {
                const saved = localStorage.getItem('mcp_servers');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        setServers(parsed);
                    }
                }
            } catch (e) {
                console.error('Failed to load MCP servers', e);
            }
        };

        loadServers();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'mcp_servers') {
                loadServers();
            }
        };

        const handleCustomEvent = () => loadServers();

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('mcp-servers-updated', handleCustomEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('mcp-servers-updated', handleCustomEvent);
        };
    }, []);

    return servers;
}
