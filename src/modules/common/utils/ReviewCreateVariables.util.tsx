import { ReviewsForm } from "../types";

export const ReviewCreateVariables = (
  formData: ReviewsForm,
  action?: string,
) => {
  return {
    input: {
      action,
      reviewCode: formData.reviewCode,
      companyCode: formData.companyCode,
      profileCode: formData.profileCode,
      studentCode: formData.studentCode,
      age: formData.age,
      gender: formData.gender,
      protocol: formData.protocol,
      protocolCardio: formData.protocolCardio,
      fatMass: formData?.massagorda ? parseFloat(String(formData.massagorda).replace(',', '.')) : null,
      leanMass: formData?.massamagra ? parseFloat(String(formData.massamagra).replace(',', '.')) : null,
      imc: formData?.imc ? parseFloat(String(formData.imc).replace(',', '.')) : null,
      iac: formData?.iac ? parseFloat(String(formData.iac).replace(',', '.')) : null,
      rcq: formData?.rcq ? parseFloat(String(formData.rcq).replace(',', '.')) : null,
      vo: formData?.vo ? parseFloat(String(formData.vo).replace(',', '.')) : null,
      residualMass: formData?.massaresidual ? parseFloat(String(formData.massaresidual).replace(',', '.')) : null,
      boneMass: formData?.massaossea ? parseFloat(String(formData.massaossea).replace(',', '.')) : null,
      muscleMass: formData?.massamuscular ? parseFloat(String(formData.massamuscular).replace(',', '.')) : null,
      waterBody: formData?.águacorporaltotal ? parseFloat(String(formData.águacorporaltotal).replace(',', '.')) : null,
      ageBody: formData?.idadecorporal ? parseFloat(String(formData.idadecorporal).replace(',', '.')) : null,
      basalMetabolic: formData?.taxametabólicabasal ? parseFloat(String(formData.taxametabólicabasal).replace(',', '.')) : null,
      sumFolds: formData?.sd ? parseFloat(String(formData.sd).replace(',', '.')) : null,
      height: formData?.height ? parseFloat(String(formData.height).replace(',', '.')) : null,
      weight: formData?.weight ? parseFloat(String(formData.weight).replace(',', '.')) : null,
      waist: formData?.waist ? parseFloat(String(formData.waist).replace(',', '.')) : null,
      abdome: formData?.abdome ? parseFloat(String(formData.abdome).replace(',', '.')) : null,
      hip: formData?.hip ? parseFloat(String(formData.hip).replace(',', '.')) : null,
      subscapularis: formData?.subscapularis ? parseFloat(String(formData.subscapularis).replace(',', '.')) : null,
      triceps: formData?.triceps ? parseFloat(String(formData.triceps).replace(',', '.')) : null,
      biceps: formData?.biceps ? parseFloat(String(formData.biceps).replace(',', '.')) : null,
      chest: formData?.chest ? parseFloat(String(formData.chest).replace(',', '.')) : null,
      middleAxillary: formData?.middleAxillary ? parseFloat(String(formData.middleAxillary).replace(',', '.')) : null,
      suprailiac: formData?.suprailiac ? parseFloat(String(formData.suprailiac).replace(',', '.')) : null,
      abdominal: formData?.abdominal ? parseFloat(String(formData.abdominal).replace(',', '.')) : null,
      medialThigh: formData?.medialThigh ? parseFloat(String(formData.medialThigh).replace(',', '.')) : null,
      medialCalf: formData?.medialCalf ? parseFloat(String(formData.medialCalf).replace(',', '.')) : null,
      wristBistyloid: formData?.wristBistyloid ? parseFloat(String(formData.wristBistyloid).replace(',', '.')) : null,
      femurBistyloid: formData?.femurBistyloid ? parseFloat(String(formData.femurBistyloid).replace(',', '.')) : null,
      dueDate: formData?.dueDate ? formData.dueDate : null,
      observation: formData?.observation ? formData.observation : null,
      response: [
        {
          question: "quaissãoseusobjetivoscomrelaçãoaatividadefísica",
          response: formData.quaissãoseusobjetivoscomrelaçãoaatividadefísica,
        },
        {
          question: "praticaatividadefísicaatualmentequaiseháquantotempo",
          response: formData.praticaatividadefísicaatualmentequaiseháquantotempo,
        },
        {
          question: "realizaacompanhamentocomnutricionistaounutricionistaesportivo",
          response: formData.realizaacompanhamentocomnutricionistaounutricionistaesportivo,
        },
        {
          question: "qualseriasuamédiadehorasdesonodiário",
          response: formData.qualseriasuamédiadehorasdesonodiário,
        },
        {
          question: "utilizaalgumtipodemedicamentodeusocontinuoqual",
          response: formData.utilizaalgumtipodemedicamentodeusocontinuoqual,
        },
        {
          question: "jápassouporalgumtipodecirurgianosúltimos6mesesqual",
          response: formData.jápassouporalgumtipodecirurgianosúltimos6mesesqual,
        },
        {
          question: "possuialgumarecomendaçãoourestriçãomédicaparapráticadeexercícios",
          response: formData.possuialgumarecomendaçãoourestriçãomédicaparapráticadeexercícios,
        },
        {
          question: "possuidiabetesoualgumaoutradoença",
          response: formData.possuidiabetesoualgumaoutradoença,
        },
        {
          question: "possuialgumaalteraçãocardíacaqual",
          response: formData.possuialgumaalteraçãocardíacaqual,
        },
        {
          question: "existemproblemascardíacosnafamíliaquem",
          response: formData.existemproblemascardíacosnafamíliaquem,
        },
        {
          question: "suapressãoarterialéaltabaixaounormal12x8",
          response: formData.suapressãoarterialéaltabaixaounormal12x8,
        },
        {
          question: "jásentiuousentedoresnopeito",
          response: formData.jásentiuousentedoresnopeito,
        },
        {
          question: "sentedoresnopeitoaorealizaralgumaatividadefísica",
          response: formData.sentedoresnopeitoaorealizaralgumaatividadefísica,
        },
        {
          question: "sentiuousentedoresnacolunaconstantesemqualregião",
          response: formData.sentiuousentedoresnacolunaconstantesemqualregião,
        },
        {
          question: "jádesmaioualgumavez",
          response: formData.jádesmaioualgumavez,
        },
        {
          question: "éfumanteháquantosanos",
          response: formData.éfumanteháquantosanos,
        },
        {
          question: "tomaalgumtipodeesteroideanabólico",
          response: formData.tomaalgumtipodeesteroideanabólico,
        },
        {
          question: "possuialgumtraumaoulesão",
          response: formData.possuialgumtraumaoulesão,
        },
        {
          question: "observações",
          response: formData.observações,
        },
        {
          question: "algummédicojádissequevocêpossuialgumproblemadecoraçãoequesódeveriarealizaratividadefísicasupervisionadoporprofissionais",
          response: formData.algummédicojádissequevocêpossuialgumproblemadecoraçãoequesódeveriarealizaratividadefísicasupervisionadoporprofissionais,
        },
        {
          question: "vocêsentedoresnopeitoquandopraticaatividadefísica",
          response: formData.vocêsentedoresnopeitoquandopraticaatividadefísica,
        },
        {
          question: "noúltimomêsvocêsentiudoresnopeitoquandopraticaatividadefísica",
          response: formData.noúltimomêsvocêsentiudoresnopeitoquandopraticaatividadefísica,
        },
        {
          question: "vocêapresentadesequilíbriodevidoatonturaeouperdadeconsciência",
          response: formData.vocêapresentadesequilíbriodevidoatonturaeouperdadeconsciência,
        },
        {
          question: "vocêpossuialgumproblemaósseoouarticularquepoderiaserpioradopelaatividadefísica",
          response: formData.vocêpossuialgumproblemaósseoouarticularquepoderiaserpioradopelaatividadefísica,
        },
        {
          question: "vocêtomaatualmentealgummedicamentoparapressãoarterialeouproblemadecoração",
          response: formData.vocêtomaatualmentealgummedicamentoparapressãoarterialeouproblemadecoração,
        },
        {
          question: "sabedealgumaoutrarazãopelaqualvocênãodevepraticaratividadefísica",
          response: formData.sabedealgumaoutrarazãopelaqualvocênãodevepraticaratividadefísica,
        },
        {
          question: "pescoço",
          response: formData?.pescoço ? String(parseFloat(String(formData.pescoço).replace(',', '.'))) : '',
        },
        {
          question: "ombro",
          response: formData?.ombro ? String(parseFloat(String(formData.ombro).replace(',', '.'))) : '',
        },
        {
          question: "braçorelaxadodireito",
          response: formData?.braçorelaxadodireito ? String(parseFloat(String(formData.braçorelaxadodireito).replace(',', '.'))) : '',
        },
        {
          question: "braçorelaxadoesquerdo",
          response: formData?.braçorelaxadoesquerdo ? String(parseFloat(String(formData.braçorelaxadoesquerdo).replace(',', '.'))) : '',
        },
        {
          question: "braçocontraídodireito",
          response: formData?.braçocontraídodireito ? String(parseFloat(String(formData.braçocontraídodireito).replace(',', '.'))) : '',
        },
        {
          question: "braçocontraídoesquerdo",
          response: formData?.braçocontraídoesquerdo ? String(parseFloat(String(formData.braçocontraídoesquerdo).replace(',', '.'))) : '',
        },
        {
          question: "antebraçodireito",
          response: formData?.antebraçodireito ? String(parseFloat(String(formData.antebraçodireito).replace(',', '.'))) : '',
        },
        {
          question: "antebraçoesquerdo",
          response: formData?.antebraçoesquerdo ? String(parseFloat(String(formData.antebraçoesquerdo).replace(',', '.'))) : '',
        },
        {
          question: "tóraxrelaxado",
          response: formData?.tóraxrelaxado ? String(parseFloat(String(formData.tóraxrelaxado).replace(',', '.'))) : '',
        },
        {
          question: "tóraxinspirado",
          response: formData?.tóraxinspirado ? String(parseFloat(String(formData.tóraxinspirado).replace(',', '.'))) : '',
        },
        {
          question: "coxadireita",
          response: formData?.coxadireita ? String(parseFloat(String(formData.coxadireita).replace(',', '.'))) : '',
        },
        {
          question: "coxaesquerda",
          response: formData?.coxaesquerda ? String(parseFloat(String(formData.coxaesquerda).replace(',', '.'))) : '',
        },
        {
          question: "panturrilhadireita",
          response: formData?.panturrilhadireita ? String(parseFloat(String(formData.panturrilhadireita).replace(',', '.'))) : '',
        },
        {
          question: "panturrilhaesquerda",
          response: formData?.panturrilhaesquerda ? String(parseFloat(String(formData.panturrilhaesquerda).replace(',', '.'))) : '',
        },
        {
          question: "distânciapercorrida",
          response: formData.distânciapercorrida,
        },
        {
          question: "tempogasto",
          response: formData.tempogasto,
        },
        {
          question: "frequênciacardíaca",
          response: formData.frequênciacardíaca,
        },
        {
          question: "flexãodebraçosrepetições",
          response: formData.flexãodebraçosrepetições,
        },
        {
          question: "abdominalrepetições",
          response: formData.abdominalrepetições,
        },
        {
          question: "sentarealcançar",
          response: formData.sentarealcançar,
        },
      ],
    },
  };
};