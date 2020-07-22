cube(`Listings`, {
  sql: `SELECT listings.id, listings.account_id, DATE(listings.system_ctime) as system_ctime, listings.listing_agent_1_id, listings.listing_agent_2_id, listings.listing_category_id, listings.price_match, listings.system_listing_state, comm_worksheets.comm_amount_net_of_tax, DATE(system_publication_time) as system_publication_time, DATE(date_actual_settlement) as date_actual_settlement, listing_contracts.detail_sale_price_or_lease_pa, DATE(date_actual_fallen) as date_actual_fallen, listing_contracts.agent_id, listing_contracts.agent_name FROM listing_contracts FULL OUTER JOIN listings ON listing_contracts.listing_id = listings.id FULL OUTER JOIN comm_worksheets ON listing_contracts.id = comm_worksheets.contract_id`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        id,
        agentName,
        listingCategoryId,
        dateActualFallen,
        dateActualSettlement
      ]
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    accountId: {
      sql: `account_id`,
      type: `number`
    },

    agentName: {
      sql: `agent_name`,
      type: `string`
    },

    systemListingState: {
      sql: `system_listing_state`,
      type: `string`
    },

    listingCategoryId: {
      sql: `listing_category_id`,
      type: `string`
    },

    dateActualFallen: {
      sql: `date_actual_fallen`,
      type: `time`
    },

    dateActualSettlement: {
      sql: `date_actual_settlement`,
      type: `time`
    },

    systemCtime: {
      sql: `system_ctime`,
      type: `time`
    },

    systemPublicationTime: {
      sql: `system_publication_time`,
      type: `time`
    }
  }
});
