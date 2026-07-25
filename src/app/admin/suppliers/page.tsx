'use client'

import { useState, useEffect } from 'react'
import { addSupplierAction } from '@/src/app/sell/actions'
import { updateSupplierDetailsAction, deleteSupplierAction, getDetailedSuppliersAction } from './actions'
import { Edit2, Trash2, Plus, X, Landmark, User, FileText, Check, ChevronDown, ChevronUp, Package, DollarSign, Calendar, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [expandedSupplierId, setExpandedSupplierId] = useState<string | null>(null)
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'products' | 'sales'>>({})

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
    const res = await getDetailedSuppliersAction()
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

  const toggleExpand = (id: string) => {
    setExpandedSupplierId(prev => prev === id ? null : id)
  }

  const setTab = (id: string, tab: 'products' | 'sales') => {
    setActiveTabMap(prev => ({ ...prev, [id]: tab }))
  }

  // Toplam finansal özetler
  const totalVolume = suppliers.reduce((acc, s) => acc + (s.totalSalesVolume || 0), 0)
  const totalCommissions = suppliers.reduce((acc, s) => acc + (s.totalCommissionEarned || 0), 0)
  const totalProducts = suppliers.reduce((acc, s) => acc + (s.totalProductCount || 0), 0)

  return (
    <div className="p-8 md:pr-24 min-h-full text-white bg-[#0F0F0F]">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">Admin Panel</p>
          <h1 className="text-3xl font-bold tracking-tight">Detaylı Tedarikçi Yönetimi</h1>
          <p className="text-white/40 text-sm mt-1">Ürün sahipliği, komisyon analizi, satış ve hakediş takibi.</p>
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

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#AF9164]/10 border border-[#AF9164]/20 flex items-center justify-center text-[#AF9164]">
            <Package size={22} />
          </div>
          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Tedarikçi Ürünleri</p>
            <p className="text-2xl font-bold text-white mt-0.5">{totalProducts} Adet</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign size={22} />
          </div>
          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Toplam Satış Hacmi</p>
            <p className="text-2xl font-bold text-white mt-0.5">{totalVolume.toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Landmark size={22} />
          </div>
          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Alınan Toplam Komisyon</p>
            <p className="text-2xl font-bold text-amber-400 mt-0.5">{totalCommissions.toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>
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
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">TC Kimlik No (TCKN)</label>
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

      {/* Düzenleme Formu */}
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
                <label className="text-[10px] text-white/40 font-bold uppercase tracking-wider">TC Kimlik No (TCKN)</label>
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
          Detaylı tedarikçi ve satış verileri yükleniyor...
        </div>
      ) : suppliers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 rounded-2xl text-center bg-white/2">
          <Landmark size={40} className="text-white/20 mb-4" />
          <h3 className="text-base font-bold text-white mb-1">Tedarikçi Bulunmuyor</h3>
          <p className="text-white/40 text-xs max-w-sm">Henüz sisteme tedarikçi tanımlamadınız. Ürün eklemede veya sağ üstteki butondan ilk tedarikçinizi ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suppliers.map((sup) => {
            const isExpanded = expandedSupplierId === sup.id
            const activeTab = activeTabMap[sup.id] || 'products'

            return (
              <div key={sup.id} className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden transition-all">
                {/* Ana Tedarikçi Kart Üstü */}
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors">
                  
                  {/* Sol İsim ve İletişim */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{sup.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 text-white/70">
                        {sup.submerchant_type}
                      </span>
                      {sup.submerchant_id ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                          <Check size={8} /> PayTR Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          İlk Satışta Açılacak
                        </span>
                      )}
                    </div>

                    {sup.company_title && (
                      <p className="text-xs text-white/40 font-medium mt-0.5">{sup.company_title}</p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-xs text-white/60 flex-wrap">
                      {sup.email && <span className="flex items-center gap-1.5"><FileText size={12} className="text-[#AF9164]" /> {sup.email}</span>}
                      {sup.phone && <span className="flex items-center gap-1.5"><User size={12} className="text-[#AF9164]" /> {sup.phone}</span>}
                      <span className="font-mono text-white/80 select-all tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        IBAN: {sup.iban.replace(/(.{4})/g, '$1 ')}
                      </span>
                      <span className="text-white/50">
                        {sup.submerchant_type === 'bireysel' ? `TCKN: ${sup.tckn || '—'}` : `VKN: ${sup.vkn || '—'}`}
                      </span>
                    </div>
                  </div>

                  {/* Sağ Finansal Metrikler ve Butonlar */}
                  <div className="flex items-center gap-6 shrink-0 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                    <div className="text-right">
                      <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Ürün / Satış</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {sup.totalProductCount} Ürün <span className="text-emerald-400">({sup.soldProductCount} Satıldı)</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Toplam Komisyon</p>
                      <p className="text-sm font-bold text-amber-400 mt-0.5">
                        {(sup.totalCommissionEarned || 0).toLocaleString('tr-TR')} ₺
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Tedarikçi Hakediş</p>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">
                        {(sup.totalSupplierPayout || 0).toLocaleString('tr-TR')} ₺
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                      <button
                        onClick={() => handleEditClick(sup)}
                        className="p-2 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer text-white/60"
                        title="Bilgileri Düzenle"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(sup.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                        title="Tedarikçiyi Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={() => toggleExpand(sup.id)}
                        className="px-3 py-2 bg-[#AF9164]/15 hover:bg-[#AF9164]/25 text-[#AF9164] border border-[#AF9164]/30 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {isExpanded ? 'Kapat' : 'Detaylar'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Genişletilmiş Detay Çekmecesi */}
                {isExpanded && (
                  <div className="border-t border-white/10 bg-black/40 p-6">
                    
                    {/* Sekme Butonları */}
                    <div className="flex gap-3 mb-6 border-b border-white/10 pb-3">
                      <button
                        onClick={() => setTab(sup.id, 'products')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                          activeTab === 'products'
                            ? 'bg-[#AF9164] text-white'
                            : 'bg-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        <ShoppingBag size={14} /> Tedarikçinin Ürünleri ({sup.totalProductCount})
                      </button>
                      <button
                        onClick={() => setTab(sup.id, 'sales')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                          activeTab === 'sales'
                            ? 'bg-[#AF9164] text-white'
                            : 'bg-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        <DollarSign size={14} /> Satış Geçmişi & Komisyon Detayları ({sup.soldProductCount})
                      </button>
                    </div>

                    {/* SEKMELER */}
                    {activeTab === 'products' ? (
                      <div>
                        {sup.products.length === 0 ? (
                          <p className="text-white/30 text-xs py-8 text-center">Bu tedarikçiye atanmış ürün bulunmuyor.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {sup.products.map((p: any) => (
                              <div key={p.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden relative shrink-0 border border-white/5">
                                  {p.public_images?.[0] ? (
                                    <Image src={p.public_images[0]} alt="" fill className="object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">—</div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[9px] font-bold text-[#AF9164] uppercase tracking-wider">{p.brand}</p>
                                  <p className="text-xs font-semibold text-white truncate">{p.model_name}</p>
                                  <p className="text-[10px] text-emerald-400 font-mono font-bold mt-0.5">
                                    {(p.price || 0).toLocaleString('tr-TR')} ₺
                                  </p>
                                </div>
                                <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  p.status === 'sold' ? 'bg-[#AF9164]/20 text-[#AF9164]' :
                                  p.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                                  'bg-white/10 text-white/40'
                                }`}>
                                  {p.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {sup.salesHistory.length === 0 ? (
                          <p className="text-white/30 text-xs py-8 text-center">Henüz satılmış bir ürün veya komisyon kaydı bulunmuyor.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[9px] font-bold">
                                  <th className="py-3 px-4">Ürün</th>
                                  <th className="py-3 px-4">Satış Tarihi</th>
                                  <th className="py-3 px-4">Satın Alan Müşteri</th>
                                  <th className="py-3 px-4 text-right">Satış Tutarı</th>
                                  <th className="py-3 px-4 text-right">Alınan Komisyon</th>
                                  <th className="py-3 px-4 text-right">Tedarikçi Ödemesi</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {sup.salesHistory.map((s: any, idx: number) => (
                                  <tr key={idx} className="hover:bg-white/[0.02]">
                                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                                      {s.productImage && (
                                        <div className="w-8 h-8 rounded bg-black relative overflow-hidden shrink-0">
                                          <Image src={s.productImage} alt="" fill className="object-cover" />
                                        </div>
                                      )}
                                      <div>
                                        <span className="text-[10px] text-[#AF9164] block">{s.productBrand}</span>
                                        {s.productModel}
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-white/60">
                                      <span className="flex items-center gap-1.5">
                                        <Calendar size={11} className="text-white/40" />
                                        {s.saleDate ? new Date(s.saleDate).toLocaleDateString('tr-TR') : '—'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-white/80 font-medium">{s.buyerName}</td>
                                    <td className="py-3 px-4 text-right font-bold text-white">
                                      {s.salePrice.toLocaleString('tr-TR')} ₺
                                    </td>
                                    <td className="py-3 px-4 text-right font-bold text-amber-400">
                                      + {s.commissionAmount.toLocaleString('tr-TR')} ₺
                                    </td>
                                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                                      {s.supplierPayout.toLocaleString('tr-TR')} ₺
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
