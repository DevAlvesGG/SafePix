import React, { useState, useEffect, useCallback } from 'react';
import styles from './Admin.module.css';

// ─── Configuração base da API ─────────────────────────────────────────────────
const API_BASE = '/api'; // ajuste se necessário, ex: 'http://localhost:3000/api'

// ─── Camada de serviço (chamadas ao backend) ──────────────────────────────────
const denunciasService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/denuncias`);
    if (!res.ok) throw new Error('Erro ao buscar denúncias');
    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${API_BASE}/denuncias/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar denúncia');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE}/denuncias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar denúncia');
    return res.json();
  },

  remove: async (id) => {
    const res = await fetch(`${API_BASE}/denuncias/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir denúncia');
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABEL = { pending: 'Pendente', confirmed: 'Confirmado', dismissed: 'Arquivado' };
const TYPE_LABEL   = { email: 'E-mail', cpf: 'CPF', phone: 'Telefone', random: 'Aleatória' };

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

// ─── Toast hook ───────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);
  return { toast, show };
}

// ─── Modal base ───────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

// ─── Modal: Visualizar ────────────────────────────────────────────────────────
// Busca individualmente no backend ao abrir — usa GET /denuncias/:id
function ViewModal({ reportId, onClose }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    denunciasService.getOne(reportId)
      .then(setReport)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [reportId]);

  return (
    <Modal title="Detalhes da Denúncia" onClose={onClose}>
      {loading && <p className={styles.stateMsg}>Carregando...</p>}
      {error   && <p className={`${styles.stateMsg} ${styles.stateMsgError}`}>{error}</p>}
      {report  && (
        <>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>ID</span>
              <span className={styles.detailValue}>#{report.id}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <StatusBadge status={report.status} />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Chave Pix</span>
              <span className={styles.detailValue}>{report.pixKey}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Tipo</span>
              <span className={styles.detailValue}>{TYPE_LABEL[report.pixKeyType] ?? report.pixKeyType}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Denunciante</span>
              <span className={styles.detailValue}>{report.reporterName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>E-mail</span>
              <span className={styles.detailValue}>{report.reporterEmail}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Valor</span>
              <span className={`${styles.detailValue} ${styles.amount}`}>{formatCurrency(report.amount)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Data</span>
              <span className={styles.detailValue}>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className={`${styles.detailItem} ${styles.fullWidth}`}>
              <span className={styles.detailLabel}>Descrição</span>
              <p className={styles.detailDescription}>{report.description}</p>
            </div>
          </div>
          <div className={styles.modalActions}>
            <button className={`${styles.btnBase} ${styles.btnSecondary}`} onClick={onClose}>Fechar</button>
          </div>
        </>
      )}
    </Modal>
  );
}

// ─── Modal: Editar ────────────────────────────────────────────────────────────
function EditModal({ report, onClose, onSaved }) {
  const [form, setForm]     = useState({ ...report });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await denunciasService.update(form.id, form);
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Editar Denúncia" onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        {error && <p className={`${styles.stateMsg} ${styles.stateMsgError}`}>{error}</p>}
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Chave Pix</label>
          <input className={styles.formInput} name="pixKey" value={form.pixKey} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Tipo de Chave</label>
          <select className={styles.formInput} name="pixKeyType" value={form.pixKeyType} onChange={handleChange}>
            <option value="email">E-mail</option>
            <option value="cpf">CPF</option>
            <option value="phone">Telefone</option>
            <option value="random">Aleatória</option>
          </select>
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Nome do Denunciante</label>
          <input className={styles.formInput} name="reporterName" value={form.reporterName} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>E-mail do Denunciante</label>
          <input className={styles.formInput} type="email" name="reporterEmail" value={form.reporterEmail} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Valor (R$)</label>
          <input className={styles.formInput} type="number" name="amount" value={form.amount} onChange={handleChange} min="0" required />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Status</label>
          <select className={styles.formInput} name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="dismissed">Arquivado</option>
          </select>
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel}>Descrição</label>
          <textarea className={`${styles.formInput} ${styles.formTextarea}`} name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className={styles.modalActions}>
          <button type="button" className={`${styles.btnBase} ${styles.btnSecondary}`} onClick={onClose} disabled={saving}>Cancelar</button>
          <button type="submit"  className={`${styles.btnBase} ${styles.btnPrimary}`}  disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Modal: Confirmar Exclusão ────────────────────────────────────────────────
function DeleteModal({ report, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState(null);

  const handleConfirm = async () => {
    setDeleting(true);
    setError(null);
    try {
      await denunciasService.remove(report.id);
      onDeleted(report.id);
      onClose();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <Modal title="Confirmar Exclusão" onClose={onClose}>
      <div className={styles.deleteBody}>
        <div className={styles.deleteIcon}>⚠️</div>
        <p className={styles.deleteText}>
          Tem certeza que deseja excluir a denúncia <strong>#{report.id}</strong> referente à chave{' '}
          <strong>{report.pixKey}</strong>?
        </p>
        <p className={styles.deleteSubtext}>Essa ação não pode ser desfeita.</p>
        {error && <p className={`${styles.stateMsg} ${styles.stateMsgError}`}>{error}</p>}
      </div>
      <div className={styles.modalActions}>
        <button className={`${styles.btnBase} ${styles.btnSecondary}`} onClick={onClose} disabled={deleting}>Cancelar</button>
        <button className={`${styles.btnBase} ${styles.btnDanger}`} onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Excluindo...' : 'Excluir'}
        </button>
      </div>
    </Modal>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats({ reports }) {
  const total       = reports.length;
  const pending     = reports.filter((r) => r.status === 'pending').length;
  const confirmed   = reports.filter((r) => r.status === 'confirmed').length;
  const totalAmount = reports.reduce((acc, r) => acc + Number(r.amount), 0);

  return (
    <div className={styles.statsGrid}>
      {[
        { label: 'Total de Denúncias', value: total,                       icon: '📋', color: 'statBlue'   },
        { label: 'Pendentes',          value: pending,                     icon: '⏳', color: 'statYellow' },
        { label: 'Confirmados',        value: confirmed,                   icon: '✅', color: 'statGreen'  },
        { label: 'Valor Total',        value: formatCurrency(totalAmount), icon: '💰', color: 'statRed'    },
      ].map(({ label, value, icon, color }) => (
        <div key={label} className={`${styles.statCard} ${styles[color]}`}>
          <span className={styles.statIcon}>{icon}</span>
          <div>
            <p className={styles.statValue}>{value}</p>
            <p className={styles.statLabel}>{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchWrapper}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        className={styles.searchInput}
        placeholder="Buscar por chave Pix, denunciante ou status…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && <button className={styles.searchClear} onClick={() => onChange('')}>✕</button>}
    </div>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────
export default function Admin() {
  const [reports, setReports]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState(null);
  const [search, setSearch]           = useState('');
  const [viewId, setViewId]           = useState(null);
  const [editReport, setEditReport]   = useState(null);
  const [deleteReport, setDeleteReport] = useState(null);
  const { toast, show: showToast }    = useToast();

  // Carrega todas as denúncias ao montar — GET /denuncias
  useEffect(() => {
  // temporário — remova quando o backend estiver pronto
  setReports([
    {
      id: 1,
      pixKey: 'email@golpista.com',
      pixKeyType: 'email',
      reporterName: 'Carlos Silva',
      reporterEmail: 'carlos@email.com',
      description: 'Realizei um pagamento e não recebi o produto.',
      amount: 500,
      date: '2025-03-01',
      status: 'pending',
    },
    {
      id: 2,
      pixKey: '123.456.789-00',
      pixKeyType: 'cpf',
      reporterName: 'Ana Oliveira',
      reporterEmail: 'ana@email.com',
      description: 'Golpe do falso emprego.',
      amount: 1200,
      date: '2025-03-02',
      status: 'confirmed',
    },
    {
      id: 3,
      pixKey: '+55 11 99999-0000',
      pixKeyType: 'phone',
      reporterName: 'Roberto Melo',
      reporterEmail: 'roberto@email.com',
      description: 'Pediu pix adiantado e sumiu.',
      amount: 350,
      date: '2025-03-03',
      status: 'dismissed',
    },
  ]);
  setLoading(false);
}, []);

  const handleSaved = useCallback((updated) => {
    setReports((prev) => prev.map((r) => r.id === updated.id ? updated : r));
    showToast('Denúncia atualizada com sucesso!');
  }, [showToast]);

  const handleDeleted = useCallback((id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    showToast('Denúncia excluída.', 'danger');
  }, [showToast]);

  const filtered = reports.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.pixKey.toLowerCase().includes(q) ||
      r.reporterName.toLowerCase().includes(q) ||
      (STATUS_LABEL[r.status] ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarBrand}>
            <span className={styles.topBarLogo}>SafePix</span>
            <span className={styles.topBarSeparator}>/</span>
            <span className={styles.topBarSection}>Painel Admin</span>
          </div>
          <span className={styles.topBarTag}>Área Restrita</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Gerenciar Denúncias</h1>
          <p className={styles.pageSubtitle}>Visualize, edite ou remova denúncias vinculadas a chaves Pix.</p>
        </div>

        {loading    && <p className={styles.stateMsg}>Carregando denúncias...</p>}
        {fetchError && <p className={`${styles.stateMsg} ${styles.stateMsgError}`}>Erro: {fetchError}</p>}

        {!loading && !fetchError && (
          <>
            <Stats reports={reports} />
            <SearchBar value={search} onChange={setSearch} />
            <div className={styles.tableWrapper}>
              {filtered.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>🔎</span>
                  <p>Nenhuma denúncia encontrada{search ? ` para "${search}"` : ''}.</p>
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>#</th>
                      <th className={styles.th}>Chave Pix</th>
                      <th className={styles.th}>Tipo</th>
                      <th className={styles.th}>Denunciante</th>
                      <th className={styles.th}>Valor</th>
                      <th className={styles.th}>Data</th>
                      <th className={styles.th}>Status</th>
                      <th className={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className={styles.tr}>
                        <td className={styles.td}><span className={styles.idTag}>#{r.id}</span></td>
                        <td className={styles.td}><code className={styles.pixKey}>{r.pixKey}</code></td>
                        <td className={styles.td}><span className={styles.typeTag}>{TYPE_LABEL[r.pixKeyType] ?? r.pixKeyType}</span></td>
                        <td className={styles.td}>{r.reporterName}</td>
                        <td className={`${styles.td} ${styles.amount}`}>{formatCurrency(r.amount)}</td>
                        <td className={styles.td}>{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                        <td className={styles.td}><StatusBadge status={r.status} /></td>
                        <td className={styles.td}>
                          <div className={styles.actions}>
                            <button className={`${styles.actionBtn} ${styles.actionView}`}   title="Visualizar" onClick={() => setViewId(r.id)}>👁</button>
                            <button className={`${styles.actionBtn} ${styles.actionEdit}`}   title="Editar"     onClick={() => setEditReport(r)}>✏️</button>
                            <button className={`${styles.actionBtn} ${styles.actionDelete}`} title="Excluir"    onClick={() => setDeleteReport(r)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <p className={styles.tableFooter}>{filtered.length} denúncia(s) exibida(s)</p>
          </>
        )}
      </main>

      {viewId       && <ViewModal   reportId={viewId}     onClose={() => setViewId(null)} />}
      {editReport   && <EditModal   report={editReport}   onClose={() => setEditReport(null)}   onSaved={handleSaved} />}
      {deleteReport && <DeleteModal report={deleteReport} onClose={() => setDeleteReport(null)} onDeleted={handleDeleted} />}

      {toast && (
        <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}>{toast.msg}</div>
      )}
    </div>
  );
}
