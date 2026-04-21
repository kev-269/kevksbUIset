// Airplane artboard

function AirplaneArtboard({ theme }) {
  return (
    <Surface theme={theme} pad={24} style={{ overflowY: 'auto' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Airplane · motion set</div>
      <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', fontFamily: 'var(--kui-font-mono)', marginBottom: 20 }}>
        blueprint reveal · flight route · radar HUD · paper plane · click blueprint / paper to replay
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>
        01 · Blueprint reveal
      </div>
      <KuiBlueprintPlane width={460} height={280}/>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginTop: 22, marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>
        02 · Flight route loader
      </div>
      <KuiFlightRoute width={460}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 22 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>
            03 · Radar HUD
          </div>
          <KuiPlaneHUD width={224}/>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>
            04 · Paper plane · success
          </div>
          <KuiPaperAirplane width={224}/>
        </div>
      </div>
    </Surface>
  );
}

Object.assign(window, { AirplaneArtboard });
