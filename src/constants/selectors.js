export const TDOC_SELECTOR_VALUES = [
  { value: "NIF", labelId: "Selector.nif", label: "NIF" },
  {
    value: "NIF_OPERADOR_INTRACOMUNITARI",
    labelId: "Selector.nif_op_intra",
    label: "NIF operador intracomunitario",
  },
  {
    value: "DOCUMENT_OFICIAL_EXPEDIT_PAIS",
    labelId: "Selector.doc_oficial",
    label: "Doc. oficial expedido en país",
  },
  { value: "PASSAPORT", labelId: "Selector.pasaporte", label: "Pasaporte" },
  {
    value: "CERTIFICAT_RESIDENCIA_FISCAL",
    labelId: "Selector.certif_residencia",
    label: "Certif. residencia fiscal",
  },
  {
    value: "ALTRE_DOCUMENT",
    labelId: "Selector.otro_documento",
    label: "Otro documento",
  },
];

export const PORTES_SELECTOR_VALUES = [
  { value: "PAGADOS", labelId: "Selector.pagados", label: "Pagados" },
  { value: "DEBIDOS", labelId: "Selector.debidos", label: "Debidos" },
  {
    value: "CARGADOS_EN_FACTURA",
    labelId: "Selector.cargados_en_factura",
    label: "Cargados en Factura",
  },
  { value: "OTROS", labelId: "Selector.otros", label: "Otros" },
];

export const MODULE_NAMES = {
  cita: {
    name: "Cita",
    icon: "Icon",
  },
};

export const PAISNIF_SELECTOR_VALUES = [
  { value: "NUMERIC", labelId: "Selector.numerico", label: "Numérico" },
  {
    value: "ALFANUMERIC",
    labelId: "Selector.Alfanumerico",
    label: "Alfanumérico",
  },
];

export const CONTABILIDAD_SELECTOR_VALUES = [
  { value: "NO_TRACTAR", labelId: "NO_TRACTAR", label: "NO TRATAR" },
  { value: "ALTA", labelId: "ALTA", label: "ALTA" },
  {
    value: "ALTA_MODIFICACIO",
    labelId: "ALTA_MODIFICACIO",
    label: "ALTA MODIFICACIÓN",
  },
  {
    value: "TRACTAR_EN_TRASPASSOS_FACTURA",
    labelId: "TRACTAR_EN_TRASPASSOS_FACTURA",
    label: "TRATAR EN TRASPASOS FACTURA",
  },
];

export const FACT_TIPO_SELECTOR_VALUES = [
  { value: "PRESSUPOST", labelId: "Selector.PRESSUPOST", label: "Presupuesto" },
  {
    value: "ADMINISTRACIO",
    labelId: "Selector.ADMINISTRACIO",
    label: "Administración",
  },
];

export const TIPO_CLIENTE_SELECTOR_VALUES = [
  { value: "FISICA", labelId: "Selector.FISICA", label: "Física" },
  { value: "JURIDICA", labelId: "Selector.JURIDICA", label: "Jurídica" },
];

export const TIPO_EXTRANJ_SELECTOR_VALUES = [
  { value: "ESTRANGER", labelId: "Selector.extran", label: "Extranjero" },
  { value: "RESIDENT", labelId: "Selector.residente", label: "Residente" },
  {
    value: "RESIDENT_UE",
    labelId: "Selector.residente_ue",
    label: "Residente UE",
  },
];

export const TIPO_MENSAJE_SELECTOR_VALUES = [
  { value: "SMS", labelId: "Selector.sms", label: "SMS" },
  { value: "EMAIL", labelId: "Selector.email", label: "Email" },
  { value: "SMS_EMAIL", labelId: "Selector.sms_email", label: "SMS + Email" },
  { value: "CAP", labelId: "Selector.ninguno", label: "NINGUNO" },
];

export const TIPO_REG_IVA_SELECTOR_VALUES = [
  {
    value: "INTRACOMUNITARI_O_INV_SUBJ_PASSIU",
    labelId: "Selector.intercomunitario",
    label: "intercomunitario o sujeto pasivo",
  },
  { value: "AGRARI", labelId: "Selector.agrario", label: "Agrario" },
  { value: "GENERAL", labelId: "Selector.general", label: "Generals" },
];

export const TIPO_RETENCION_SELECTOR_VALUES = [
  {
    value: "SOBRE_BASE",
    labelId: "Selector.baseImponible",
    label: "Sobre base imponible",
  },
  {
    value: "SOBRE_BASE_IVA",
    labelId: "Selector.baseIva",
    label: "Sobre base IVA",
  },
  {
    value: "ABANS_BASE",
    labelId: "Selector.antesBaseImp",
    label: "Antes de base imponible",
  },
];

export const TIPO_FACTURA_SELECTOR_VALUES = [
  {
    value: "SUBCLIENT",
    labelId: "Selector.subcliente",
    label: "Subcliente",
  },
  {
    value: "GENERAL",
    labelId: "Selector.general",
    label: "General",
  },
  {
    value: "DOMICILI_COMERCIAL",
    labelId: "Selector.domiciliComercial",
    label: "Domicili Comercial",
  },
  {
    value: "REFERENCIA_ALBARA",
    labelId: "Selector.referenciaAlb",
    label: "Referencia albarán",
  },
  {
    value: "INDIVIDUAL_ALBARA",
    labelId: "Selector.individualAlb",
    label: "Albarán indivual",
  },
];

export const TIPO_ENVIO_FACT_SELECTOR_VALUES = [
  {
    value: "EN_MA",
    labelId: "Selector.enMano",
    label: "En mano",
  },
  {
    value: "PER_CORREU",
    labelId: "Selector.porCorreo",
    label: "Por correo",
  },
  {
    value: "PER_FAX",
    labelId: "Selector.porFax",
    label: "Por fax",
  },
  {
    value: "PER_EMAIL",
    labelId: "Selector.porEmail",
    label: "Por email",
  },
  {
    value: "AVIS_TELEFON",
    labelId: "Selector.avisoTelf",
    label: "Aviso telefónico",
  },
  {
    value: "VARIS",
    labelId: "Selector.varios",
    label: "Varios",
  },
];

export const TIPO_RECIBOS_SELECTOR_VALUES = [
  {
    value: "NO",
    labelId: "Selector.no",
    label: "No",
  },
  {
    value: "PAPER",
    labelId: "Selector.paper",
    label: "Papel",
  },
  {
    value: "DISQUET",
    labelId: "Selector.disquete",
    label: "Disquete",
  },
];

export const ALBARAN_CLIENT_SELECTOR_VALUES = [
  {
    value: "CLASE_0",
    labelId: "Selector.clase0",
    label: "Clase 0",
  },
  {
    value: "CLASE_1",
    labelId: "Selector.clase1",
    label: "Clase 1",
  },
];

export const TIPO_DESCUENTO_SELECTOR_VALUES = [
  {
    value: "PRIMER_DESCOMPTE",
    labelId: "Selector.primerDesc",
    label: "Primer descuento",
  },
  {
    value: "SEGON_DESCOMPTE",
    labelId: "Selector.segundoDesc",
    label: "Segundo descuento",
  },
  {
    value: "TERCER_DESCOMPTE",
    labelId: "Selector.tercerDesc",
    label: "Tercer descuento",
  },
  {
    value: "QUART_DESCOMPTE",
    labelId: "Selector.cuartoDesc",
    label: "Cuarto descuento",
  },
  {
    value: "QUINT_DESCOMPTE",
    labelId: "Selector.quintoDesc",
    label: "Quinto descuento",
  },
];

export const TIPO_NIF_SELECTOR_VALUES = [
  {
    value: "NUMERIC",
    labelId: "Selector.numerico",
    label: "Numérico",
  },
  {
    value: "ALFANUMERIC",
    labelId: "Selector.Alfanumerico",
    label: "AlfaNumérico",
  },
];

export const TIPO_CONTABILIZACION_SELECTOR_VALUES = [
  {
    value: "COMPTABILITZAR",
    labelId: "Selector.contabilizar",
    label: "Contabilizar",
  },
  {
    value: "NOMES_VENCIMENT",
    labelId: "Selector.soloVencimento",
    label: "Solo vencimiento",
  },
  {
    value: "COMPTABILITZAR_MES_VENCIMENT",
    labelId: "Selector.contabilizarMasVEnc",
    label: "Contabilizar más vencimiento",
  },
];

export const ESTADO_PRESUPUESTO_SELECTOR_VALUES = [
  {
    value: "ACCEPTAT",
    labelId: "Selector.aceptado",
    label: "Aceptado",
  },
  {
    value: "PENDENT",
    labelId: "Selector.pendiente",
    label: "Pendiente",
  },
  {
    value: "TANCAT",
    labelId: "Selector.cerrado",
    label: "Cerrado",
  },
  {
    value: "AJORNAT",
    labelId: "Selector.aplazado",
    label: "Aplazado",
  },
];
export const TIPO_VENCIMIENTO_SELECTOR_VALUES = [
  {
    value: "IMPORT_FIXE",
    labelId: "Selector.importeFijo",
    label: "Importe fijo",
  },
  {
    value: "IMPORT_PORCENTUAL",
    labelId: "Selector.importePorcentual",
    label: "Importe Porcentual",
  },
  {
    value: "PAGAMENT_TERMINIS",
    labelId: "Selector.pagoTerminio",
    label: "Pago Terminio",
  },
  {
    value: "ESCALAT",
    labelId: "Selector.escalado",
    label: "Escalado",
  },
];

export const TIPO_MES_SELECTOR_VALUES = [
  {
    value: "GENER",
    labelId: "Selector.mes.enero",
    label: "Enero",
  },
  {
    value: "FEBRER",
    labelId: "Selector.mes.febrero",
    label: "Febrero",
  },
  {
    value: "MARÇ",
    labelId: "Selector.mes.marzo",
    label: "Marzo",
  },
  {
    value: "ABRIL",
    labelId: "Selector.mes.abril",
    label: "Abril",
  },
  {
    value: "MAIG",
    labelId: "Selector.mes.mayo",
    label: "Mayo",
  },
  {
    value: "JUNY",
    labelId: "Selector.mes.junio",
    label: "Junio",
  },
  {
    value: "JULIOL",
    labelId: "Selector.mes.julio",
    label: "Julio",
  },
  {
    value: "AGOST",
    labelId: "Selector.mes.agosto",
    label: "Agosto",
  },
  {
    value: "SETEMBRE",
    labelId: "Selector.mes.septiembre",
    label: "Septiembre",
  },
  {
    value: "NOVEMBRE",
    labelId: "Selector.mes.noviembre",
    label: "Noviembre",
  },
  {
    value: "OCTUBRE",
    labelId: "Selector.mes.octubre",
    label: "Octubre",
  },
  {
    value: "DESEMBRE",
    labelId: "Selector.mes.diciembre",
    label: "Diciembre",
  },
];

export const TIPO_ENUM_PUNT_VENTA_VALUES = [
  {
    value: "DIARIA",
    labelId: "Selector.diaria",
    label: "Diaria",
  },
  {
    value: "GLOBAL",
    labelId: "Selector.global",
    label: "Global",
  },
];

export const TIPO_IMPRESION_PUNT_VENTA_VALUES = [
  {
    value: "SEMPRE",
    labelId: "Selector.siempre",
    label: "Siempre",
  },
  {
    value: "MAI",
    labelId: "Selector.nunca",
    label: "Nunca",
  },
  {
    value: "DEMANAR",
    labelId: "Selector.preguntar",
    label: "Preguntar",
  },
];

export const PRECIO_ALBARAN_SELECTOR_VALUES = [
  {
    value: "TARIFA_CLIENT",
    labelId: "Selector.tarifaCliente",
    label: "Tarifa cliente",
  },
  {
    value: "ALBARA_PROVEIDOR_AMB_DTE",
    labelId: "Selector.albaranConDesc",
    label: "Albarán proveedor con descuento",
  },
  {
    value: "ALBARA_PROVEIDOR_SENSE_DTE",
    labelId: "Selector.albaranSinDesc",
    label: "Albarán proveedor sin descuento",
  },
];

export const TIPO_PROYECTO_ALBARAN_SELECTOR_VALUES = [
  {
    value: "MEDICIO",
    labelId: "Selector.medicion",
    label: "Medición",
  },
  {
    value: "ADMINISTRACIO",
    labelId: "Selector.administracion",
    label: "Administración",
  },
  {
    value: "PRESSUPOST",
    labelId: "Selector.presupuesto",
    label: "Presupuesto",
  },
];

export const TIPO_RETENCION2_SELECTOR_VALUES = [
  {
    value: "SOBRE_BASE_IMP",
    labelId: "Selector.baseImponible",
    label: "Sobre base imponible",
  },
  {
    value: "SOBRE_BASE_AMB_IVA",
    labelId: "Selector.baseIva",
    label: "Sobre base IVA",
  },
  {
    value: "ABANS_BASE_IMP",
    labelId: "Selector.antesBaseImp",
    label: "Antes de base imponible",
  },
];

export const TIPO_ESTADO_PROYECTO_SELECTOR_VALUES = [
  {
    value: "ADJUDICAT",
    labelId: "Selector.adjudicado",
    label: "Adjudicado",
  },
  {
    value: "EXECUCIO",
    labelId: "Selector.ejecucion",
    label: "Ejecución",
  },
  {
    value: "RECEPCIO_FINAL",
    labelId: "Selector.recepcionFinal",
    label: "Recepción final",
  },
  {
    value: "TANCAT",
    labelId: "Selector.cerrado",
    label: "Cerrado",
  },
  {
    value: "RECEPCIO_PROV",
    labelId: "Selector.recepcionProv",
    label: "Recepción provisional",
  },
];


export const TIPO_DIR_COMERCIALES_SELECTOR_VALUES = [
  {
    value: "S",
    labelId: "Comun.si",
    label: "Si",
  },
  {
    value: "N",
    labelId: "Comun.no",
    label: "No",
  },

];




export const TIPO_EJECUCION_PROYECTO_SELECTOR_VALUES = [
  {
    value: "LLIURE",
    labelId: "Selector.libre",
    label: "Libre",
  },
  {
    value: "FACTUR",
    labelId: "Selector.facturado",
    label: "Facturado",
  },
  {
    value: "IMPUTA",
    labelId: "Selector.imputado",
    label: "Imputado",
  },
  {
    value: "ASSIG",
    labelId: "Selector.asignado",
    label: "Asignado",
  },
];



