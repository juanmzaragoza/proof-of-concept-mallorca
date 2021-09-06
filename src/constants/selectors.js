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
  { value: "NO_TRACTAR", labelId: "Selector.no_tratar", label: "NO TRATAR" },
  { value: "ALTA", labelId: "Selector.alta", label: "ALTA" },
  {
    value: "ALTA_MODIFICACIO",
    labelId: "Selector.alta_modificacion",
    label: "ALTA MODIFICACIÓN",
  },
  {
    value: "TRACTAR_EN_TRASPASSOS_FACTURA",
    labelId: "Selector.tratarTranspasos",
    label: "TRATAR EN TRASPASOS FACTURA",
  },
];

export const FACT_TIPO_SELECTOR_VALUES = [
  {
    value: "PRESSUPOST",
    labelId: "Selector.presupuesto",
    label: "Presupuesto",
  },
  {
    value: "ADMINISTRACIO",
    labelId: "Selector.administracion",
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
    labelId: "Selector.sinRecibos",
    label: "No",
  },
  {
    value: "PAPER",
    labelId: "Selector.formatoPapel",
    label: "Formato Papel",
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

export const TIPO_REGISTRO_COMERCIAL_SELECTOR_VALUES = [
  {
    value: "CRIDADA",
    labelId: "Selector.llamada",
    label: "Llamada",
  },
  {
    value: "CORREU",
    labelId: "Selector.correo",
    label: "Correo",
  },
  {
    value: "VISITA_PRESENCIAL",
    labelId: "Selector.visitaPresencial",
    label: "Visita Presencial",
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

export const MEDIO_SELECTOR_VALUES = [
  {
    value: "WEB",
    labelId: "Selector.web",
    label: "Web de la empresa",
  },
  {
    value: "CERCADOR",
    labelId: "Selector.buscador",
    label: "Buscador",
  },
  {
    value: "CONEGUT",
    labelId: "Selector.conocido",
    label: "Conocido",
  },
  {
    value: "FIRA",
    labelId: "Selector.feria",
    label: "Feria o acontecimiento",
  },
  {
    value: "PUBLICITAT",
    labelId: "Selector.publicidad",
    label: "Publicidad",
  },
  {
    value: "CONEIX_EMPRESA",
    labelId: "Selector.conoceEmpresa",
    label: "Interesado ya conoce la empresa",
  },
  {
    value: "VISITA_COMERCIAL",
    labelId: "Selector.visitaComercial",
    label: "Visita comercial de la empresa",
  },
  {
    value: "REUNIO_DE_TREBALL",
    labelId: "Selector.reunionTrabajo",
    label: "Reunión de trabajo",
  },
  {
    value: "FORMACIO",
    labelId: "Selector.formacion",
    label: "Formación",
  },
  {
    value: "ALTRES",
    labelId: "Selector.otros",
    label: "Otros",
  },
];

export const AVISO_ALBARANES_CLIENTE_SELECTOR_VALUES = [
  {
    value: "NO_AVISAR",
    labelId: "Selector.noAvisar",
    label: "No avisar",
  },
  {
    value: "SI_ES_MES_DE_LO_PRESSUPOSTAT",
    labelId: "Selector.siEsMasPresupuesto",
    label: "Si es más de lo presupuesto",
  },
  {
    value: "SI_NO_ES_LO_PRESSUPOSTAT",
    labelId: "Selector.siNoEsLoPresupuesto",
    label: "Si no es lo presupuesto",
  },
];

export const TIPO_FAMILIA_ARTICULO_SELECTOR_VALUES = [
  {
    value: "MATERIAL",
    labelId: "Selector.material",
    label: "Material",
  },
  {
    value: "MA_OBRA",
    labelId: "Selector.manoObra",
    label: "Mano de obra",
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

export const TIPO_SERVEI_FAMILIA_ARTICULO_SELECTOR_VALUES = [
  {
    value: "OBRA_SERVEI",
    labelId: "Selector.obraServicio",
    label: "Obra_Servicio",
  },
  {
    value: "TALLER",
    labelId: "Selector.taller",
    label: "Taller",
  },
];

export const FACTURA_RECTIFICATIVA_SELECTOR_VALUES = [
  {
    value: "NO",
    labelId: "Selector.no",
    label: "No",
  },
  {
    value: "SI",
    labelId: "Selector.si",
    label: "Si",
  },
  {
    value: "MULTIPLE",
    labelId: "Selector.multiple",
    label: "Múltiple",
  },
];

export const TIPO_TARIFA_SELECTOR_VALUES = [
  {
    value: "TARIFA_GENERAL_SOBRE_COST",
    labelId: "Selector.tarifaGeneralSobreCoste",
    label: "Tarifa general sobre coste",
  },
  {
    value: "TARIFA_GENERAL_SOBRE_PVP",
    labelId: "Selector.tarifaGeneralSobrePvp",
    label: "Tarifa general sobre PVP",
  },
  {
    value: "TARIFA_PARTICULAR_SOBRE_COST",
    labelId: "Selector.tarifaParticularSobreCoste",
    label: "Tarifa particular sobre coste",
  },
  {
    value: "TARIFA_PARTICULAR_SOBRE_PVP",
    labelId: "Selector.tarifaParticularSobrePvp",
    label: "Tarifa particular sobre PVP",
  },
];

export const FORMA_CALCULO_SELECTOR_VALUES = [
  {
    value: "COST",
    labelId: "Selector.coste",
    label: "Coste",
  },
  {
    value: "VENDA",
    labelId: "Selector.venta",
    label: "Venta",
  },
];

export const VALORACION_INVENTARIO_TRABAJO_SELECTOR_VALUES = [
  {
    value: "PREU_MITJA_COST_GLOBAL",
    labelId: "Almacen.select.precioMedioCosteGlobal",
    label: "Precio medio coste global",
  },
  {
    value: "ULTIM_PREU_DE_COST",
    labelId: "Almacen.select.ultimoPrecioCoste",
    label: "Último precio de coste",
  },
  {
    value: "PREU_MITJA_COST_EXISTENCIA",
    labelId: "Almacen.select.precioMedioCosteExistencia",
    label: "Precio medio coste de existencia",
  },
  {
    value: "PREU_COMPRA_TEORIC_DE_ARTICLE",
    labelId: "Almacen.select.precioCompraTeoricoArticulo",
    label: "Precio compra teórico de artículo",
  },
  {
    value: "PREU_COST_TEORIC_DE_ARTICLE",
    labelId: "Almacen.select.precioCosteTeoricoArticulo",
    label: "Precio coste teórico de artículo",
  },
];

export const FORMA_PAGO_FACT_SELECTOR_VALUES = [
  {
    value: "PLAZO",
    labelId: "Selector.aPlazos",
    label: "A plazos",
  },
  {
    value: "CONTADO",
    labelId: "Selector.alContado",
    label: "Al contado",
  },
];

export const TIPO_RETENCION3_SELECTOR_VALUES = [
  {
    value: "DESPUES_BASE",
    labelId: "Selector.despuesBaseImp",
    label: "Después de base imponible",
  },
  {
    value: "SOBRE_BASE_MASIVA",
    labelId: "Selector.baseIva",
    label: "Sobre base IVA",
  },
  {
    value: "ANTES_BASE",
    labelId: "Selector.antesBaseImp",
    label: "Antes de base imponible",
  },
];

export const RAPPEL_SELECTOR_VALUES = [
  {
    value: "NO",
    labelId: "Articulos.precio.select.no",
    label: "No",
  },
  {
    value: "ALBARA_TIPUS_0",
    labelId: "Articulos.precio.select.albaranTipo0",
    label: "Albaran tipo 0",
  },
  {
    value: "ALBARA_TIPUS_1",
    labelId: "Articulos.precio.select.albaranTipo1",
    label: "Albaran tipo 1",
  },
  {
    value: "ALBARA_TIPUS_0_Y_1",
    labelId: "Articulos.precio.select.albaranTipo0Y1",
    label: "Albaran tipo 0 y 1",
  },
];

export const TIPO_RAPPEL_SELECTOR_VALUES = [
  {
    value: "PER_UNITATS",
    labelId: "Articulos.precio.select.porUnidades",
    label: "Por unidades",
  },
  {
    value: "PER_IMPORTS",
    labelId: "Articulos.precio.select.porImportes",
    label: "Por importes",
  },
  {
    value: "PER_MARGE",
    labelId: "Articulos.precio.select.porMargen",
    label: "Por margen",
  },
];

export const CLASIFICACION_SELECTOR_VALUES = [
  {
    value: "VIVAS",
    labelId: "Articulos.stock.descuentos.select.vivas",
    label: "Vivas",
  },
  {
    value: "DORMIDAS",
    labelId: "Articulos.stock.descuentos.select.dormidas",
    label: "Dormidas",
  },
  {
    value: "OBSOLETAS",
    labelId: "Articulos.stock.descuentos.select.obsoletas",
    label: "Obsoletas",
  },
  {
    value: "MUERTAS",
    labelId: "Articulos.stock.descuentos.select.muertas",
    label: "Muertas",
  },
];

export const DIMENSION_SELECTOR_VALUES = [
  {
    value: "NO_TE_DIMENSIONS",
    labelId: "Articulos.presentacion.dimensiones.select.noDimensiones",
    label: "No tiene dimensiones",
  },
  {
    value: "LLARG",
    labelId: "Articulos.presentacion.dimensiones.select.largo",
    label: "Largo",
  },
  {
    value: "LLARG_X_AMPLE",
    labelId: "Articulos.presentacion.dimensiones.select.largoXAncho",
    label: "Largo x ancho",
  },
  {
    value: "LLARG_X_AMPLE_X_ALT",
    labelId: "Articulos.presentacion.dimensiones.select.largoXAnchoXAlto",
    label: "Largo x ancho x alto",
  },
];

export const APP_PROYECTOS_SELECTOR_VALUES = [
  {
    value: "APL0",
    labelId: "Selector.aplicacion1",
    label: "Aplicación 1",
  },
  {
    value: "APL1",
    labelId: "Selector.aplicacion2",
    label: "Aplicación 2",
  },
  {
    value: "APL2",
    labelId: "Selector.aplicacion3",
    label: "Aplicación 3",
  },
  {
    value: "APL3",
    labelId: "Selector.aplicacion4",
    label: "Aplicación Clientes",
  },
  {
    value: "APL4",
    labelId: "Selector.aplicacion5",
    label: "Prueba",
  },
  {
    value: "APL5",
    labelId: "Selector.aplicacion6",
    label: "Canteras Ibiza",
  },
];

export const ROL_OPERARIO_SELECTOR_VALUES = [
  {
    value: "CAPGRUP",
    labelId: "Selector.jefeGrupo",
    label: "Jefe Grupo",
  },
  {
    value: "RESPONSABLE",
    labelId: "Selector.responsable",
    label: "Responsable",
  },
  {
    value: "ENCARREGAT",
    labelId: "Selector.encargado",
    label: "Encargado",
  },
  {
    value: "ADMINISTRATIU",
    labelId: "Selector.administrativo",
    label: "Administrativo ",
  },
];

export const TIPO_INVERSION_SELECTOR_VALUES = [
  {
    value: "NO_SUJETO_INVERSION",
    labelId: "Selector.noSujeto",
    label: "No sujeto a inversión",
  },
  {
    value: "PROMOTOR",
    labelId: "Selector.promotor",
    label: "Promotor",
  },
  {
    value: "CONTRATISTA",
    labelId: "Selector.contratista",
    label: "Contratista",
  },
  {
    value: "SUBCONTRATISTA",
    labelId: "Selector.subcontratista",
    label: "Subcontratista",
  },
  {
    value: "ESBORRAR_DE_AQUI",
    labelId: "Selector.borrar",
    label: "Borrar ",
  },
];

export const TIPO_OBRA_SELECTOR_VALUES = [
  {
    value: "CONTRUCCION_EDIFICACIONES",
    labelId: "Selector.construccion",
    label: "Construccion Edificaciones",
  },
  {
    value: "REHABILITACION_EDIFICACIONES",
    labelId: "Selector.rehabilitacion",
    label: "Rehabilitacion Edificacionesr",
  },
  {
    value: "URBANIZACION_TERRENOS",
    labelId: "Selector.urbanizacion",
    label: "Urbanización Terrenos",
  },
  {
    value: "OTROS",
    labelId: "Selector.otros",
    label: "Otros",
  },
];

export const INCIDENCIA_PORCENTAJE_SELECTOR_VALUES = [
  {
    value: "SOBRE_TOTAL_CALCULADO",
    labelId: "Articulos.costes.select.sobreTotalCalculado",
    label: "Sobre total calculado",
  },
  {
    value: "SOBRE_SUMA_DE_IMPORTES",
    labelId: "Articulos.costes.select.sobreSumaImportes",
    label: "Sobre suma de importes",
  },
];

export const TIPO_PRODUCTO_SELECTOR_VALUES = [
  {
    value: "PRODUCTE",
    labelId: "Selector.producto",
    label: "Producto",
  },
  {
    value: "APLICACIO",
    labelId: "Selector.aplicacion",
    label: "Aplicación",
  },
];

export const TIPO_COSTES_SELECTOR_VALUES = [
  {
    value: "IMPORTE",
    labelId: "Selector.importe",
    label: "Importe",
  },
  {
    value: "PORCENTAJE",
    labelId: "Selector.porcentaje",
    label: "Porcentaje",
  },
];

export const TIPO_CLASIFICACION_SELECTOR_VALUES = [
  {
    value: "OBRES",
    labelId: "Selector.obras",
    label: "Obras",
  },
  {
    value: "SERVEIS",
    labelId: "Selector.servicios",
    label: "Servicios",
  },
];

export const ESTADO_PEDIDO_PROV_SELECTOR_VALUES = [
  {
    value: "ACEPTADA",
    labelId: "Selector.aceptado",
    label: "Aceptado",
  },
  {
    value: "PENDENT",
    labelId: "Selector.pendiente",
    label: "Pendiente",
  },
  {
    value: "TANCADA",
    labelId: "Selector.cerrado",
    label: "Cerrado",
  },
  {
    value: "RETENIDA",
    labelId: "Selector.retenido",
    label: "Retenido",
  },
  {
    value: "PREVISIO",
    labelId: "Selector.prevision",
    label: "Previsión",
  },
];

export const PORTES_PEDIDO_SELECTOR_VALUES = [
  { value: "PAGATS", labelId: "Selector.pagados", label: "Pagados" },
  { value: "DEGUTS", labelId: "Selector.debidos", label: "Debidos" },
  {
    value: "CARREGATS_EN_FACTURA",
    labelId: "Selector.cargados_en_factura",
    label: "Cargados en Factura",
  },
  { value: "ALTRES", labelId: "Selector.otros", label: "Otros" },
];

export const ESTADO_OFERTA_PROV_SELECTOR_VALUES = [
  {
    value: "ANULADA",
    labelId: "Selector.anulada",
    label: "Anulada",
  },
  {
    value: "PENDENT",
    labelId: "Selector.pendiente",
    label: "Pendiente",
  },
  {
    value: "ASIGNADA",
    labelId: "Selector.asignada",
    label: "Asignada",
  },
];

export const TIPO_TRANSPORTE_SELECTOR_VALUES = [
  {
    value: "1",
    labelId: "Selector.transporte",
    label: "Transporte",
  },
  {
    value: "2",
    labelId: "Selector.transportable",
    label: "Transportable",
  },
];

export const TIPO_DESTINO_SELECTOR_VALUES = [
  {
    value: "ENTREGADO",
    labelId: "Selector.entregado",
    label: "Entregado",
  },
  {
    value: "DEPOSITO",
    labelId: "Selector.depositado",
    label: "depositado",
  },
  {
    value: "RESERVADO",
    labelId: "Selector.reservado",
    label: "reservado",
  },
];

export const TIPO_ALBARAN_SELECTOR_VALUES = [
  {
    value: "DEPOSIT",
    labelId: "Selector.deposito",
    label: "deposito",
  },
  {
    value: "COMPRA",
    labelId: "Selector.compra",
    label: "Compra",
  },
];

export const TIPO_DOC_ALBARAN_SELECTOR_VALUES = [
  {
    value: "ALBARA",
    labelId: "Selector.albaran",
    label: "albaran",
  },
  {
    value: "FACTURA",
    labelId: "Selector.factura",
    label: "factura",
  },
];

export const APLICADOR_TYPE_SELECTOR_VALUES = [
  {
    value: "BASICO",
    labelId: "Selector.basico",
    label: "Básico",
  },
  {
    value: "CUALIFICADO",
    labelId: "Selector.cualificado",
    label: "Cualificado",
  },
  {
    value: "FUMIGADOR",
    labelId: "Selector.fumigador",
    label: "Fumigdor",
  },
  {
    value: "PILOTO",
    labelId: "Selector.piloto",
    label: "Piloto",
  },
  {
    value: "OTROS",
    labelId: "Selector.otros",
    label: "Otros",
  },
];

export const CERTIFICATION_SELECTOR_VALUES = [
  {
    value: "N",
    labelId: "Selector.no",
    label: "No",
  },
  {
    value: "S",
    labelId: "Selector.si",
    label: "Si",
  },
];

export const ACTUALIZAR_PRECIO_SELECTOR_VALUES = [
  {
    value: "false",
    labelId: "Selector.no",
    label: "No",
  },
  {
    value: "true",
    labelId: "Selector.si",
    label: "Si",
  },
];


export const TIPO_INCIDENCIA_SELECTOR_VALUES = [
  {
    value: "CLIENT",
    labelId: "Selector.cliente",
    label: "Cliente",
  },
  {
    value: "FACTURA",
    labelId: "Selector.factura",
    label: "factura",
  },
];


export const TIPO_PUBLICAR_WEB_SELECTOR_VALUES = [
  {
    value: "S",
    labelId: "Selector.si",
    label: "Si",
  },
  {
    value: "N",
    labelId: "Selector.no",
    label: "No",
  },
  {
    value: "",
    labelId: "Selector.segunCliente",
    label: "Según Cliente",
  },
];