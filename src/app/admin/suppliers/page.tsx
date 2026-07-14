'use client'

import { useState, useEffect } from 'react'
import { getSuppliersAction, addSupplierAction } from '@/src/app/sell/actions'
import { updateSupplierDetailsAction, deleteSupplierAction } from './actions'
import { Edit2, Trash2, Plus, X, Landmark, User, FileText, Check } from 'lucide-react'

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Edit State
  const [editingSupplierId, setEditingSupplierId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editAddress, setEditAddress] = useState('')
  const [editIban, setEditIban] = useState('')
  const [editTckn, setEditTckn] = useState('')
  const [editVkn, setEditVkn] = useState('')
  const [editCompanyTitle, setEditCompanyTitle] = useState('')
  const [editType, setEditType] = useState<'bireysel' | 'kurumsal'>('bireysel')

  // Create State
  const [showAddForm, setShowAddForm] = useState(false)
  const [addName, setAddName] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [addPhone, setAddPhone] = useState('')
  const [addAddress, setAddAddress] = useState('')
  const [addIban, setAddIban] = useState('')
  const [addTckn, setAddTckn] = useState('')
  const [addVkn, setAddVkn] = useState('')
  const [addCompanyTitle, setAddCompanyTitle] = useState('')
  const [addType, setAddType] = useState<'bireysel' | 'kurumsal'>('bireysel')

  useEffect(() => {
    loadSuppliers()
  }, [])

  async function loadSuppliers() {
    setIsLoading(true)
    const res = await getSuppliersAction()
    if (res.success) {
      setSuppliers(res.suppliers || [])
    }
    setIsLoading(false)
  }

  const handleEditClick = (supplier: any) => {
    setEditingSupplierId(supplier.id)
    setEditName(supplier.name)
    setEditEmail(supplier.email || '')
    setEditPhone(supplier.phone || '')
    setEditAddress(supplier.address || '')
    setEditIban(supplier.iban)
    setEditTckn(supplier.tckn || '')
    setEditVkn(supplier.vkn || '')
    setEditCompanyTitle(supplier.company_title || '')
    setEditType(supplier.submerchant_type || 'bireysel')
    setErrorMsg('')
    setSuccessMsg('')
  }

  const handleSaveEdit = async () => {
    if (!editingSupplierId) return
    if (!editName || !editIban) {
      setErrorMsg('Tedarikçi adı ve IBAN alanları zorunludur.')
      return
    }
    setIsSubmitting(true)
    setErrorMsg('')
    
    const res = await updateSupplierDetailsAction(editingSupplierId, {
      name: editName,
      email: editEmail || null,
      phone: editPhone || null,
      address: editAddress || null,
      iban: editIban,
      tckn: editTckn || null,
      vkn: editVkn || null,
      company_title: editCompanyTitle || null,
      submerchant_type: editType
    })

    setIsSubmitting(false)
    if (res.success) {
      setSuccessMsg('Tedarikçi başarıyla güncellendi.')
      setEditingSupplierId(null)
      loadSuppliers()
    } else {
      setErrorMsg(res.error || 'Güncellenirken bir hata oluştu.')
    }
  }

  const handleCreateSupplier = async () => {
    if (!addName || !addIban) {
      setErrorMsg('Tedarikçi adı ve IBAN alanları zorunludur.')
      return
    }
    setIsSubmitting(true)
    setErrorMsg('')

    const res = await addSupplierAction({
      name: addName,
      email: addEmail || undefined,
      phone: addPhone || undefined,
      address: addAddress || undefined,
      iban: addIban,
      tckn: addTckn || undefined,
      vkn: addVkn || undefined,
      company_title: addCompanyTitle || undefined,
      submerchant_type: addType
    })

    setIsSubmitting(false)
    if (res.success) {
      setSuccessMsg('Tedarikçi başarıyla eklendi.')
      setShowAddForm(false)
      // Reset
      setAddName('')
      setAddEmail('')
      setAddPhone('')
      setAddAddress('')
      setAddIban('')
      setAddTckn('')
      setAddVkn('')
      setAddCompanyTitle('')
      loadSuppliers()
    } else {
      setErrorMsg(res.error || 'Tedarikçi eklenirken bir hata oluştu.')
    }
  }

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Bu tedarikçiyi silmek istediğinize emin misiniz?')) return
    setErrorMsg('')
    const res = await deleteSupplierAction(id)
    if (res.success) {
      setSuccessMsg('Tedarikçi başarıyla silindi.')
      loadSuppliers()
    } else {
      setErrorMsg(res.error || 'Silinirken bir hata oluştu.')
    }
  }

  return (
    <div className="p-8 min-h-full text-white bg-[#0F0F0F]">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
          <h1 className="text-3xl font-bold tracking-tight">Tedarikçi Yönetimi</h1>
          <p className="text-white/40 text-sm mt-1">Ödeme bölüşümü (Split Payment) için tedarikçilerin IBAN ve vergi bilgileri.</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm)
            setEditingSupplierId(null)
            setErrorMsg('')
            setSuccessMsg('')
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#AF9164] hover:bg-[#977a51] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer self-start"
        >
          {showAddForm ? <X size={14} /> : <Plus size={14} />}
          {showAddForm ? 'İptal Et' : 'Yeni Tedarikçi'}
        </button>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
          <span>⚠️</span> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <span>✓</span> {successMsg}
        </div>
      )}

      {/* Ekleme Formu */}
      {showAddForm && (
        <div className="mb-10 p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#AF9164] border-b border-white/5 pb-2">Yeni Tedarikçi Ekle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Tedarikçi Adı/Unvanı</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Tedarikçi A"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">E-posta</label>
              <input
                type="email"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="eposta@peony.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Telefon</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={addPhone}
                onChange={(e) => setAddPhone(e.target.value)}
                placeholder="053..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">IBAN</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white uppercase"
                value={addIban}
                onChange={(e) => setAddIban(e.target.value)}
                placeholder="TR..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Tedarikçi Türü</label>
              <select
                className="w-full text-xs py-2.5 px-4 bg-neutral-900 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={addType}
                onChange={(e) => setAddType(e.target.value as any)}
              >
                <option value="bireysel">Bireysel</option>
                <option value="kurumsal">Kurumsal</option>
              </select>
            </div>
            {addType === 'bireysel' ? (
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">TC Kimlik No</label>
                <input
                  type="text"
                  className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                  value={addTckn}
                  onChange={(e) => setAddTckn(e.target.value)}
                  placeholder="11 haneli TCKN"
                  maxLength={11}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Vergi No (VKN)</label>
                <input
                  type="text"
                  className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                  value={addVkn}
                  onChange={(e) => setAddVkn(e.target.value)}
                  placeholder="10 haneli VKN"
                  maxLength={10}
                />
              </div>
            )}
          </div>

          {addType === 'kurumsal' && (
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Şirket Resmi Unvanı</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={addCompanyTitle}
                onChange={(e) => setAddCompanyTitle(e.target.value)}
                placeholder="Resmi Şirket Unvanı A.Ş."
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Adres</label>
            <textarea
              className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
              value={addAddress}
              onChange={(e) => setAddAddress(e.target.value)}
              placeholder="Fatura/Yasal Adresi"
              rows={2}
            />
          </div>

          <button
            onClick={handleCreateSupplier}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-white text-black hover:bg-white/90 text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet ve Listeye Ekle'}
          </button>
        </div>
      )}

      {/* Düzenleme Formu (Modal/Sheet tarzı üstte render edilir) */}
      {editingSupplierId && (
        <div className="mb-10 p-6 bg-[#1A1A1A] border border-amber-500/20 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Edit2 size={14} /> Tedarikçi Bilgilerini Düzenle
            </h3>
            <button onClick={() => setEditingSupplierId(null)} className="text-white/40 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Tedarikçi Adı/Unvanı</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">E-posta</label>
              <input
                type="email"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Telefon</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">IBAN</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white uppercase"
                value={editIban}
                onChange={(e) => setEditIban(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Tedarikçi Türü</label>
              <select
                className="w-full text-xs py-2.5 px-4 bg-neutral-950 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={editType}
                onChange={(e) => setEditType(e.target.value as any)}
              >
                <option value="bireysel">Bireysel</option>
                <option value="kurumsal">Kurumsal</option>
              </select>
            </div>
            {editType === 'bireysel' ? (
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">TC Kimlik No</label>
                <input
                  type="text"
                  className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                  value={editTckn}
                  onChange={(e) => setEditTckn(e.target.value)}
                  maxLength={11}
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Vergi No (VKN)</label>
                <input
                  type="text"
                  className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                  value={editVkn}
                  onChange={(e) => setEditVkn(e.target.value)}
                  maxLength={10}
                />
              </div>
            )}
          </div>

          {editType === 'kurumsal' && (
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Şirket Resmi Unvanı</label>
              <input
                type="text"
                className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
                value={editCompanyTitle}
                onChange={(e) => setEditCompanyTitle(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Adres</label>
            <textarea
              className="w-full text-xs py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:outline-none text-white"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-amber-500 text-black hover:bg-amber-400 text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
            <button
              onClick={() => setEditingSupplierId(null)}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-white/40 text-sm">
          Yükleniyor...
        </div>
      ) : suppliers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 rounded-2xl text-center bg-white/2">
          <Landmark size={40} className="text-white/20 mb-4" />
          <h3 className="text-base font-bold text-white mb-1">Tedarikçi Bulunmuyor</h3>
          <p className="text-white/40 text-xs max-w-sm">Henüz sisteme tedarikçi tanımlamadınız. Ürün eklemede veya sağ üstteki butondan ilk tedarikçinizi ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-[#111111] border border-white/5 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[9px] font-bold">
                  <th className="py-4 px-6">Tedarikçi Adı</th>
                  <th className="py-4 px-6">İletişim</th>
                  <th className="py-4 px-6">IBAN</th>
                  <th className="py-4 px-6">Vergi/Kimlik</th>
                  <th className="py-4 px-6 text-center">PayTR Durumu</th>
                  <th className="py-4 px-6 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {suppliers.map((sup) => (
                  <tr key={sup.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white">
                      <div>
                        {sup.name}
                        {sup.company_title && <span className="block text-[10px] text-white/40 font-normal mt-0.5">{sup.company_title}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/60 space-y-0.5">
                      {sup.email && <div className="flex items-center gap-1.5"><FileText size={10} /> {sup.email}</div>}
                      {sup.phone && <div className="flex items-center gap-1.5"><User size={10} /> {sup.phone}</div>}
                    </td>
                    <td className="py-4 px-6 font-mono text-white/80 select-all tracking-wider">
                      {sup.iban.replace(/(.{4})/g, '$1 ')}
                    </td>
                    <td className="py-4 px-6 text-white/70">
                      <div>
                        <span className="text-[10px] text-white/30 uppercase mr-1">{sup.submerchant_type}:</span>
                        {sup.submerchant_type === 'bireysel' ? (sup.tckn || '—') : (sup.vkn || '—')}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {sup.submerchant_id ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                          <Check size={8} /> Aktif (PayTR)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          İlk Satışta Açılacak
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(sup)}
                          className="p-2 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer text-white/60"
                          title="Bilgileri Düzenle"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(sup.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                          title="Tedarikçiyi Sil"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
