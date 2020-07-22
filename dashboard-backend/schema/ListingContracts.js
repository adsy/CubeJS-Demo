cube(`ListingContracts`, {
  sql: `SELECT * FROM public.listing_contracts`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [systemVerifiedSettlementByUserName, purchtenantResidence, systemVerifiedUnconditionalByUserName, purchtenantLegalName, systemCreatedUserName, systemVerifiedFallenByUserName, systemOwnerUserName, id, agentName, systemModifiedUserName, systemVerifiedFallenByUserId, dateActualPossession, dateExpecPossession, dateActualFallen, systemVerifiedSettlementDate, systemVerifiedUnconditionalDate, dateActualUnconditional, dateActualAccepted, dateExpecFinance, systemVerifiedFallenDate, dateActualDeposit, dateActualFinance, dateExpecDeposit, dateActualSettlement, dateExpecSettlement, dateExpecUnconditional]
    },
    
    detailFinanceAmount: {
      sql: `detail_finance_amount`,
      type: `sum`
    }
  },
  
  dimensions: {
    systemVerifiedSettlementByUserName: {
      sql: `system_verified_settlement_by_user_name`,
      type: `string`
    },
    
    isPrimaryBackupOffer: {
      sql: `is_primary_backup_offer`,
      type: `string`
    },
    
    purchtenantResidence: {
      sql: `purchtenant_residence`,
      type: `string`
    },
    
    systemVerifiedUnconditionalByUserName: {
      sql: `system_verified_unconditional_by_user_name`,
      type: `string`
    },
    
    purchtenantLegalName: {
      sql: `purchtenant_legal_name`,
      type: `string`
    },
    
    systemCreatedUserName: {
      sql: `system_created_user_name`,
      type: `string`
    },
    
    systemVerifiedFallenByUserName: {
      sql: `system_verified_fallen_by_user_name`,
      type: `string`
    },
    
    systemOwnerUserName: {
      sql: `system_owner_user_name`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    isBackupOffer: {
      sql: `is_backup_offer`,
      type: `string`
    },
    
    agentName: {
      sql: `agent_name`,
      type: `string`
    },
    
    systemModifiedUserName: {
      sql: `system_modified_user_name`,
      type: `string`
    },
    
    systemVerifiedFallenByUserId: {
      sql: `system_verified_fallen_by_user_id`,
      type: `string`
    },
    
    detailFinanceLender: {
      sql: `detail_finance_lender`,
      type: `string`
    },
    
    notes: {
      sql: `notes`,
      type: `string`
    },
    
    dateActualPossession: {
      sql: `date_actual_possession`,
      type: `string`
    },
    
    chattels: {
      sql: `chattels`,
      type: `string`
    },
    
    dateExpecPossession: {
      sql: `date_expec_possession`,
      type: `string`
    },
    
    dateActualFallen: {
      sql: `date_actual_fallen`,
      type: `time`
    },
    
    systemVerifiedSettlementDate: {
      sql: `system_verified_settlement_date`,
      type: `time`
    },
    
    systemModtime: {
      sql: `system_modtime`,
      type: `time`
    },
    
    systemVerifiedUnconditionalDate: {
      sql: `system_verified_unconditional_date`,
      type: `time`
    },
    
    dateActualUnconditional: {
      sql: `date_actual_unconditional`,
      type: `time`
    },
    
    dateActualAccepted: {
      sql: `date_actual_accepted`,
      type: `time`
    },
    
    dateExpecFinance: {
      sql: `date_expec_finance`,
      type: `time`
    },
    
    systemVerifiedFallenDate: {
      sql: `system_verified_fallen_date`,
      type: `time`
    },
    
    systemCtime: {
      sql: `system_ctime`,
      type: `time`
    },
    
    dateActualDeposit: {
      sql: `date_actual_deposit`,
      type: `time`
    },
    
    dateActualFinance: {
      sql: `date_actual_finance`,
      type: `time`
    },
    
    dateExpecDeposit: {
      sql: `date_expec_deposit`,
      type: `time`
    },
    
    dateActualSettlement: {
      sql: `date_actual_settlement`,
      type: `time`
    },
    
    dateExpecSettlement: {
      sql: `date_expec_settlement`,
      type: `time`
    },
    
    dateExpecUnconditional: {
      sql: `date_expec_unconditional`,
      type: `time`
    }
  }
});
