import React, { useEffect, useState } from 'react';
export function App() {
  const [state, setState] = useState({ loading: true, message: '' });
  useEffect(() => {
    fetch('/api/message').then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json(); })
      .then(data => setState({ loading: false, message: data.message }))
      .catch(() => setState({ loading: false, message: 'Backend is not reachable' }));
  }, []);
  return <main><section><span>Jenkins + SonarQube + ECR + Argo CD + EKS</span><h1>GitOps Test Application</h1><p>{state.loading ? 'Contacting backend...' : state.message}</p><small>Frontend and backend are deployed independently.</small></section></main>;
}
