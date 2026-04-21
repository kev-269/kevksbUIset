// Forms artboard

function FormsArtboard({ theme }) {
  const [name, setName] = React.useState('engineering-lab-02');
  const [email, setEmail] = React.useState('not-an-email');
  const [bio, setBio] = React.useState('');
  const [sw1, setSw1] = React.useState(true);
  const [sw2, setSw2] = React.useState(false);
  const [ck1, setCk1] = React.useState(true);
  const [ck2, setCk2] = React.useState(false);
  const [rd, setRd] = React.useState('rw');
  const [region, setRegion] = React.useState('us-east-1');
  const [seg, setSeg] = React.useState('private');

  return (
    <Surface theme={theme} pad={24} style={{ overflowY: 'auto' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Forms</div>
      <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', fontFamily: 'var(--kui-font-mono)', marginBottom: 18 }}>
        input · textarea · checkbox · radio · switch · select · dropzone · segmented
      </div>

      <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
        <KuiField label="Workspace name" required hint="Lowercase, numbers, dashes">
          <KuiInput value={name} onChange={(e) => setName(e.target.value)} />
        </KuiField>

        <KuiField label="Email" required error={email.includes('@') ? null : 'Please enter a valid email'}>
          <KuiInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </KuiField>

        <KuiField label="Search">
          <KuiInputGroup icon={KuiIcons.search} placeholder="Search commits, files, people…" />
        </KuiField>

        <KuiField label="Region">
          <KuiSelect value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="us-east-1">us-east-1 · Virginia</option>
            <option value="us-west-2">us-west-2 · Oregon</option>
            <option value="eu-west-1">eu-west-1 · Ireland</option>
            <option value="ap-south-1">ap-south-1 · Mumbai</option>
          </KuiSelect>
        </KuiField>

        <KuiField label="Description" hint={`${bio.length} / 240`}>
          <KuiTextarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 240))} placeholder="What is this workspace for?" />
        </KuiField>
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>Switches</div>
      <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
        <KuiSwitch on={sw1} onChange={setSw1} label="Enable CI/CD pipeline" />
        <KuiSwitch on={sw2} onChange={setSw2} label="Send weekly email digest" />
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>Checkboxes</div>
      <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
        <KuiCheckbox on={ck1} onChange={setCk1} label="Require two-factor auth" />
        <KuiCheckbox on={ck2} onChange={setCk2} label="Allow public API access" />
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>Radio group · access level</div>
      <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
        <KuiRadio on={rd === 'r'} onChange={() => setRd('r')} label="Read-only" />
        <KuiRadio on={rd === 'rw'} onChange={() => setRd('rw')} label="Read & write" />
        <KuiRadio on={rd === 'admin'} onChange={() => setRd('admin')} label="Admin (full control)" />
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>Segmented control</div>
      <div style={{ marginBottom: 20 }}>
        <KuiSegmented value={seg} onChange={setSeg} items={[
          { value: 'private', label: 'Private' },
          { value: 'team', label: 'Team' },
          { value: 'public', label: 'Public' },
        ]} />
      </div>

      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>File upload</div>
      <KuiDrop />

      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <KuiBtn variant="flat">Cancel</KuiBtn>
        <KuiBtn variant="suggested">Save changes</KuiBtn>
      </div>
    </Surface>
  );
}

Object.assign(window, { FormsArtboard });
