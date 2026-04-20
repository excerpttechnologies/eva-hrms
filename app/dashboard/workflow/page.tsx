'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { RiFlowChart, RiAddLine, RiPlayLine, RiPauseLine, RiDeleteBinLine, RiArrowRightLine, RiCheckLine, RiMailLine, RiUserLine, RiBellLine, RiTimeLine } from 'react-icons/ri';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  label: string;
  config: string;
  color: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  runs: number;
  nodes: WorkflowNode[];
  lastRun: string;
}

const nodeTypes = [
  { type: 'trigger', label: 'Trigger', color: '#3b82f6', icon: RiPlayLine, options: ['Employee joins', 'Leave submitted', 'Payroll processed', 'Performance review due', 'Asset assigned'] },
  { type: 'condition', label: 'Condition', color: '#8b5cf6', icon: RiFlowChart, options: ['If department = Engineering', 'If salary > $80K', 'If attendance < 85%', 'If leave days > 5'] },
  { type: 'action', label: 'Action', color: '#10b981', icon: RiCheckLine, options: ['Send email', 'Create task', 'Notify manager', 'Update record', 'Generate report'] },
  { type: 'delay', label: 'Delay', color: '#f59e0b', icon: RiTimeLine, options: ['Wait 1 day', 'Wait 1 week', 'Wait 30 minutes'] },
];

const prebuiltWorkflows: Workflow[] = [
  {
    id: 'W001', name: 'New Employee Onboarding', description: 'Automate the complete onboarding process for new hires', active: true, runs: 24, lastRun: '2 hours ago',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Employee Joins', config: 'On new employee record created', color: '#3b82f6' },
      { id: 'n2', type: 'action', label: 'Send Welcome Email', config: 'Template: welcome_employee.html', color: '#10b981' },
      { id: 'n3', type: 'delay', label: 'Wait 1 Day', config: '24 hours', color: '#f59e0b' },
      { id: 'n4', type: 'action', label: 'Assign IT Equipment', config: 'Create asset request', color: '#10b981' },
      { id: 'n5', type: 'action', label: 'Schedule 1:1', config: 'Calendar: manager + new hire', color: '#10b981' },
    ],
  },
  {
    id: 'W002', name: 'Leave Approval Flow', description: 'Automatic routing and approval for leave requests', active: true, runs: 156, lastRun: '5 min ago',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Leave Submitted', config: 'On leave request created', color: '#3b82f6' },
      { id: 'n2', type: 'condition', label: 'Days > 3?', config: 'If leave.days > 3', color: '#8b5cf6' },
      { id: 'n3', type: 'action', label: 'Notify HR Manager', config: 'Requires HR approval', color: '#10b981' },
      { id: 'n4', type: 'action', label: 'Auto-Approve', config: 'For ≤ 3 days', color: '#10b981' },
    ],
  },
  {
    id: 'W003', name: 'Payroll Anomaly Alert', description: 'AI-powered detection and notification for payroll issues', active: false, runs: 8, lastRun: '1 week ago',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Payroll Processed', config: 'On payroll run complete', color: '#3b82f6' },
      { id: 'n2', type: 'condition', label: 'AI Anomaly Detected?', config: 'If anomaly_score > 0.7', color: '#8b5cf6' },
      { id: 'n3', type: 'action', label: 'Notify Finance', config: 'Send alert with details', color: '#10b981' },
      { id: 'n4', type: 'action', label: 'Flag for Review', config: 'Create helpdesk ticket', color: '#10b981' },
    ],
  },
];

const typeIcons: Record<string, any> = { trigger: RiPlayLine, condition: RiFlowChart, action: RiCheckLine, delay: RiTimeLine };

export default function WorkflowPage() {
  const [loading, setLoading] = useState(true);
  const [workflows, setWorkflows] = useState(prebuiltWorkflows);
  const [activeWF, setActiveWF] = useState<string | null>('W001');
  const [dragging, setDragging] = useState<string | null>(null);
  const [canvasNodes, setCanvasNodes] = useState<WorkflowNode[]>([]);
  const [building, setBuilding] = useState(false);

  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const selected = workflows.find(w => w.id === activeWF);

  const toggleActive = (id: string) => setWorkflows(wfs => wfs.map(w => w.id === id ? { ...w, active: !w.active } : w));

  const addNodeToCanvas = (nodeType: any) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: nodeType.type,
      label: nodeType.options[0],
      config: 'Click to configure',
      color: nodeType.color,
    };
    setCanvasNodes(prev => [...prev, newNode]);
  };

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiFlowChart size={22} color="white" />
        </div>
        <div>
          <h1 className="page-title">Workflow Automation</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Build no-code automations for your HR processes</p>
        </div>
        <button className="btn-primary" style={{ marginLeft: 'auto' }} onClick={() => { setBuilding(true); setCanvasNodes([]); setActiveWF(null); }}>
          <RiAddLine size={16} /> New Workflow
        </button>
      </div>

      {!building ? (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
          {/* Workflow list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {workflows.map(wf => (
              <div key={wf.id} onClick={() => { setActiveWF(wf.id); setBuilding(false); }}
                className="card" style={{ padding: 16, cursor: 'pointer', borderLeft: `3px solid ${activeWF === wf.id ? '#3b82f6' : 'transparent'}`, transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', flex: 1 }}>{wf.name}</div>
                  <button onClick={e => { e.stopPropagation(); toggleActive(wf.id); }}
                    style={{ width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer', background: wf.active ? '#3b82f6' : 'var(--border)', position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, transition: 'left 0.2s', left: wf.active ? 19 : 3 }} />
                  </button>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{wf.description}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-muted)' }}>
                  <span>🔄 {wf.runs} runs</span>
                  <span>⏱ {wf.lastRun}</span>
                  <span className={`badge ${wf.active ? 'badge-success' : 'badge-default'}`} style={{ fontSize: 9 }}>{wf.active ? 'Active' : 'Paused'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow canvas (view mode) */}
          {selected && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{selected.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{selected.description}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-secondary" onClick={() => setBuilding(true)}>Edit</button>
                  <button className={selected.active ? 'btn-secondary' : 'btn-primary'} onClick={() => toggleActive(selected.id)}>
                    {selected.active ? <><RiPauseLine size={14} /> Pause</> : <><RiPlayLine size={14} /> Activate</>}
                  </button>
                </div>
              </div>

              {/* Node chain */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {selected.nodes.map((node, i) => {
                  const Icon = typeIcons[node.type] || RiCheckLine;
                  return (
                    <div key={node.id}>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 18px', background: node.color + '12', border: `1px solid ${node.color}30`, borderRadius: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: node.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={18} color={node.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: node.color }}>{node.type}</span>
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{node.label}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{node.config}</div>
                        </div>
                      </div>
                      {i < selected.nodes.length - 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                          <div style={{ width: 2, height: 20, background: 'var(--border)' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Builder Mode */
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
          {/* Node palette */}
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Drag Nodes</div>
            {nodeTypes.map(nt => {
              const Icon = nt.icon;
              return (
                <div key={nt.type} draggable
                  onDragStart={() => setDragging(nt.type)}
                  onClick={() => addNodeToCanvas(nt)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, background: nt.color + '12', border: `1px solid ${nt.color}30`, marginBottom: 8, cursor: 'grab', transition: 'all 0.15s' }}>
                  <Icon size={16} color={nt.color} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: nt.color }}>{nt.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Click to add</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas */}
          <div className="card" style={{ padding: 20, minHeight: 400 }}
            onDragOver={e => e.preventDefault()}
            onDrop={() => dragging && addNodeToCanvas(nodeTypes.find(n => n.type === dragging)!)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Workflow Canvas</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-secondary" onClick={() => setBuilding(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => { setBuilding(false); alert('Workflow saved!'); }}><RiCheckLine size={14} /> Save Workflow</button>
              </div>
            </div>
            {canvasNodes.length === 0 ? (
              <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, border: '2px dashed var(--border)', borderRadius: 12, color: 'var(--text-muted)' }}>
                <RiFlowChart size={40} style={{ opacity: 0.3 }} />
                <div style={{ fontWeight: 600 }}>Drag nodes here or click to add</div>
                <div style={{ fontSize: 12 }}>Build your automation flow visually</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {canvasNodes.map((node, i) => {
                  const Icon = typeIcons[node.type] || RiCheckLine;
                  return (
                    <div key={node.id}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 16px', background: node.color + '12', border: `1px solid ${node.color}30`, borderRadius: 10 }}>
                        <Icon size={16} color={node.color} />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: node.color }}>{node.type}</span>
                          <select className="input" style={{ display: 'block', marginTop: 4, fontSize: 11, padding: '4px 8px', width: '100%' }}>
                            {nodeTypes.find(n => n.type === node.type)?.options.map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <button onClick={() => setCanvasNodes(prev => prev.filter(n => n.id !== node.id))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}>
                          <RiDeleteBinLine size={14} />
                        </button>
                      </div>
                      {i < canvasNodes.length - 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                          <div style={{ width: 2, height: 16, background: 'var(--border)' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <button onClick={() => addNodeToCanvas(nodeTypes[2])} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', border: '1px dashed var(--border)', borderRadius: 8, background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}>
                    <RiAddLine size={14} /> Add step
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
