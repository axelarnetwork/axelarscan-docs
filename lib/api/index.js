const request = async params => {
  const response = await fetch('https://api.axelarscan.io', { method: 'POST', body: JSON.stringify(params) }).catch(error => { return null })
  return response && await response.json()
}

// export const getRoutes = async params => await request({ ...params, method: 'getRoutes' })
export const getRoutes = async () => [
  {
    "id": "interchainChart",
    "description": "The API route provides the number of interchain activities for each day in a specific timeframe.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "interchainChart"
      },
      {
        "id": "granularity",
        "type": "string",
        "value": "day"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "fantom"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200,
        "override": {
          "value": 1659373200
        }
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600,
        "override": {
          "value": 1659459600
        }
      }
    ]
  },
  {
    "id": "interchainTotalFee",
    "description": "The API route provides the total fee of the interchain activities through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "interchainTotalFee"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "fantom"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "interchainTotalActiveUsers",
    "description": "The API route provides the total active users of the interchain activities through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "interchainTotalActiveUsers"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "fantom"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "searchTransfers",
    "description": "The Search API provides query-based access to the cross-chain transfer information on the Axelar network. The response includes only the transfers that the Axelar network has already confirmed.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchTransfers"
      },
      {
        "id": "txHash",
        "type": "string",
        "value": "C0CB3812B653A6B1A4AD48C26C5C7B1BB2FF15F96D2C2074EC69AB71E9B504E6"
      },
      {
        "id": "type",
        "type": "string",
        "enums": ["deposit_address", "send_token", "wrap", "unwrap", "erc20_transfer"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis",
        "override": {
          "value": "osmosis"
        }
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon",
        "override": {
          "value": "polygon"
        }
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "depositAddress",
        "type": "string",
        "value": "axelar1vg69vtxpz0c3pjljpfxwzvcuqjhyh4lj4mj7cqwjw7ntl8hy5rdqwm22sz"
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "osmo17e0m33ts0ph9s84fw7gsdt0lgfursu5gs88rcx"
      },
      {
        "id": "recipientAddress",
        "type": "string",
        "value": "0xd146c053f9ea51199d273c769c4fae2a8e12d7b3"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 10,
        "override": {
          "value": 5
        }
      }
    ]
  },
  {
    "id": "transfersStats",
    "description": "The API route returns the statistics of the cross-chain transfers by each combination of source chain, destination chain, and assets.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersStats"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400,
        "override": {
          "value": 1646240400
        }
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600,
        "override": {
          "value": 1659459600
        }
      }
    ]
  },
  {
    "id": "transfersChart",
    "description": "The API route provides information used for visualizing Transfers charts on the Transfers page. The provided data include transfer information, such as the number of transfers and volumes for each day in a specific timeframe.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersChart"
      },
      {
        "id": "granularity",
        "type": "string",
        "value": "day"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400,
        "override": {
          "value": 1646240400
        }
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600,
        "override": {
          "value": 1659459600
        }
      }
    ]
  },
  {
    "id": "transfersCumulativeVolume",
    "description": "The API route provides the cumulative volume of the cross-chain transfer through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersCumulativeVolume"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "transfersTotalVolume",
    "description": "The API route provides the total volume of the cross-chain transfer through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersTotalVolume"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "transfersTotalFee",
    "description": "The API route provides the total fee of the cross-chain transfer through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersTotalFee"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "transfersTotalActiveUsers",
    "description": "The API route provides the total active users of the cross-chain transfer through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersTotalActiveUsers"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "transfersTopUsers",
    "description": "The API route provides the top users of the cross-chain transfer through the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "transfersTopUsers"
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "osmosis"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "asset",
        "type": "string",
        "value": "uusdc"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1646240400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      },
      {
        "id": "orderBy",
        "type": "string",
        "enums": ["volume", "num_txs"]
      }
    ]
  },
  {
    "id": "searchGMP",
    "description": "The search API route provides query-based access to GMP transfers and related transactions and statuses.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchGMP"
      },
      {
        "id": "txHash",
        "type": "string",
        "value": "0xcf23ba9d658c71928ced065cb4756282c52442952a5cadede85f6b9de111b1cd"
      },
      {
        "id": "txLogIndex",
        "type": "integer",
        "value": 1
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "confirming", "confirmable", "express_executed", "confirmed", "approving", "approvable", "approved", "executing", "executed", "error", "express_executable", "executable", "insufficient_fee", "not_enough_gas_to_execute"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 10,
        "override": {
          "value": 5
        }
      }
    ]
  },
  {
    "id": "getGasPrice",
    "description": "The API route provides a gas price conversion rate for each source and destination chain. It can be used as a part of estimating the gas fee. Please note that a complete method that provides the estimated gas fee is available on the [AxelarJS SDK](https://docs.axelar.dev/dev/axelarjs-sdk/axelar-query-api#estimategasfee).",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getGasPrice"
      },
      {
        "id": "sourceChain",
        "require": true,
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "require": true,
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceTokenSymbol",
        "type": "string",
        "value": "AVAX"
      },
      {
        "id": "sourceTokenAddress",
        "type": "string",
        "value": "0x0000000000000000000000000000000000000000",
        "override": {
          "value": "0x0000000000000000000000000000000000000000"
        }
      }
    ]
  },
  {
    "id": "getFees",
    "description": "The API route provides the based fee information for each combination of source & destination chains.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getFees"
      },
      {
        "id": "sourceChain",
        "require": true,
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "require": true,
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceTokenSymbol",
        "type": "string",
        "value": "AVAX"
      },
      {
        "id": "sourceTokenAddress",
        "type": "string",
        "value": "0x0000000000000000000000000000000000000000",
        "override": {
          "value": "0x0000000000000000000000000000000000000000"
        }
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xce16F69375520ab01377ce7B88f5BA8C48F8D666"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0xce16F69375520ab01377ce7B88f5BA8C48F8D666"
      },
      {
        "id": "symbol",
        "type": "string",
        "value": "axlUSDC (The parameter corresponds to the token being transferred with the call, and its value is the symbol on the source chain, e.g., USDC on Ethereum, axlUSDC on Polygon.)"
      },
      {
        "id": "amount",
        "type": "number",
        "value": 1
      },
      {
        "id": "amountInUnits",
        "type": "BigNumber",
        "value": "1000000 (Passing either amount or amountInUnits is acceptable.)"
      }
    ]
  },
  {
    "id": "GMPStats",
    "description": "The API route returns the statistics of the General Message Passing (GMP) calls by each combination of source chain, destination chain, and assets.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPStats"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200,
        "override": {
          "value": 1659373200
        }
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600,
        "override": {
          "value": 1659459600
        }
      }
    ]
  },
  {
    "id": "GMPChart",
    "description": "The API route provides the number of GMP calls for each day in a specific timeframe.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPChart"
      },
      {
        "id": "granularity",
        "type": "string",
        "value": "day"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200,
        "override": {
          "value": 1659373200
        }
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600,
        "override": {
          "value": 1659459600
        }
      }
    ]
  },
  {
    "id": "GMPCumulativeVolume",
    "description": "The API route provides the cumulative volume of the GMP through the Axelar network.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPCumulativeVolume"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "GMPTotalVolume",
    "description": "The API route provides the total volume of the GMP through the Axelar network.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPTotalVolume"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "GMPTotalFee",
    "description": "The API route provides the total fee of the GMP through the Axelar network.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPTotalFee"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "GMPTotalActiveUsers",
    "description": "The API route provides the total active users of the GMP through the Axelar network.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPTotalActiveUsers"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "GMPTopUsers",
    "description": "The API route provides the top users by number of transactions of the GMP through the Axelar network.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "GMPTopUsers"
      },
      {
        "id": "contractMethod",
        "type": "string",
        "enums": ["callContract", "callContractWithToken"]
      },
      {
        "id": "sourceChain",
        "type": "string",
        "value": "avalanche"
      },
      {
        "id": "destinationChain",
        "type": "string",
        "value": "moonbeam"
      },
      {
        "id": "sourceContractAddress",
        "type": "string",
        "value": "0xebDF3AAc44eE77b1b194965dEA863d77BB9EB131"
      },
      {
        "id": "destinationContractAddress",
        "type": "string",
        "value": "0x8fE4B6135B80a4640B7E8a0e12da01c31176F60e"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["called", "express_executed", "confirmed", "approved", "executed", "error"]
      },
      {
        "id": "senderAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "relayerAddress",
        "type": "string",
        "value": "0xD36aac0c9676e984D72823Fb662ce94D3Ab5E551"
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1659373200
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1659459600
      }
    ]
  },
  {
    "id": "getTVL",
    "description": "The API route provides the latest total volume locked (TVL) on the Axelar network, separated by assets.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getTVL"
      },
      {
        "id": "asset",
        "require": true,
        "type": "string",
        "value": "uusdc"
      }
    ]
  },
  {
    "id": "searchUptimes",
    "description": "The API route provides information on each validator's uptime.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchUptimes"
      },
      {
        "id": "fromBlock",
        "type": "integer",
        "value": 3238351
      },
      {
        "id": "toBlock",
        "type": "integer",
        "value": 3248301
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 50,
        "override": {
          "value": 50
        }
      }
    ]
  },
  {
    "id": "searchHeartbeats",
    "description": "The API route provides information on each validator's submitted heartbeat.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchHeartbeats"
      },
      {
        "id": "sender",
        "require": true,
        "type": "string",
        "value": "axelar19fu359586zyl88qpmufwycuan4zfcu8m55n577"
      },
      {
        "id": "fromBlock",
        "type": "integer",
        "value": 3238351
      },
      {
        "id": "toBlock",
        "type": "integer",
        "value": 3248301
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 50,
        "override": {
          "value": 50
        }
      }
    ]
  },
  {
    "id": "getChainMaintainers",
    "description": "The API route provides information of the chain maintainers.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getChainMaintainers"
      },
      {
        "id": "chain",
        "type": "string",
        "value": "polygon",
        "override": {
          "value": "polygon"
        }
      }
    ]
  },
  {
    "id": "getCirculatingSupply",
    "description": "The API route provides information of the circulating supply of the Axelar Network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getCirculatingSupply"
      }
    ]
  },
  {
    "id": "getTotalSupply",
    "description": "The API route provides information of the total supply of the Axelar Network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getTotalSupply"
      }
    ]
  },
  {
    "id": "getInflation",
    "description": "The API route provides information of the inflation rate in the Axelar Network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getInflation"
      }
    ]
  },
  {
    "id": "searchPolls",
    "description": "The API route provides the information of each EVM poll, including the poll id, chain, evm transaction id, transfer id, participants, etc.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchPolls"
      },
      {
        "id": "pollId",
        "type": "string",
        "value": "7434",
        "override": {
          "value": "7434"
        }
      },
      {
        "id": "event",
        "type": "string",
        "value": "transfer"
      },
      {
        "id": "chain",
        "type": "string",
        "value": "ethereum"
      },
      {
        "id": "transactionId",
        "type": "string",
        "value": "0xc6ceb7df529fe558e0e9716dac6dfb9cb8de30a69f47750774d8465ccef5dc26"
      },
      {
        "id": "transferId",
        "type": "integer",
        "value": 316641
      },
      {
        "id": "depositAddress",
        "type": "string",
        "value": "0xb51dfead39aa0c781d64d2e4c84e310e806ac4c5"
      },
      {
        "id": "voter",
        "type": "string",
        "value": "axelar1l6fudyfdc6j3qznkmkl7afk9950nuagqqfhscq",
        "override": {
          "value": "axelar1l6fudyfdc6j3qznkmkl7afk9950nuagqqfhscq"
        }
      },
      {
        "id": "vote",
        "type": "string",
        "enums": ["yes", "no", "unsubmitted"]
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["completed", "failed", "confirmed", "pending"]
      },
      {
        "id": "fromBlock",
        "type": "integer",
        "value": 4500000
      },
      {
        "id": "toBlock",
        "type": "integer",
        "value": 4510000
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1664150400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1664236800
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 10,
        "override": {
          "value": 10
        }
      }
    ]
  },
  {
    "id": "searchBatches",
    "description": "The API route provides a list of the recent command batches that are going to (or have been submitted to) EVM chains.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "searchBatches"
      },
      {
        "id": "chain",
        "type": "string",
        "value": "polygon"
      },
      {
        "id": "batchId",
        "type": "string",
        "value": "257b481e57411aad38e1637c7f868fd837a5dd53f49875c8ed3f5985d516b9b9"
      },
      {
        "id": "commandId",
        "type": "string",
        "value": "000000000000000000000000000000000000000000000000000000000004a850",
        "override": {
          "value": "000000000000000000000000000000000000000000000000000000000004a850"
        }
      },
      {
        "id": "keyId",
        "type": "string",
        "value": "evm-polygon-3645756"
      },
      {
        "id": "type",
        "type": "string",
        "value": "mintToken"
      },
      {
        "id": "status",
        "type": "string",
        "enums": ["executed", "unexecuted", "signed", "signing", "aborted"]
      },
      {
        "id": "fromTime",
        "type": "unixTime",
        "value": 1662458400
      },
      {
        "id": "toTime",
        "type": "unixTime",
        "value": 1662544800
      },
      {
        "id": "from",
        "type": "integer",
        "value": 0
      },
      {
        "id": "size",
        "type": "integer",
        "value": 10,
        "override": {
          "value": 10
        }
      }
    ]
  },
  {
    "id": "getChains",
    "description": "The API route provides all chains information supported on the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getChains"
      }
    ]
  },
  {
    "id": "getAssets",
    "description": "The API route provides all assets information supported on the Axelar network.",
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getAssets"
      }
    ]
  },
  {
    "id": "getContracts",
    "description": "The API route provides a list of Axelar gateway and the Gas Service contract addresses on each EVM-supported chain.",
    "is_gmp": true,
    "methods": ["post"],
    "parameters": [
      {
        "id": "method",
        "require": true,
        "type": "string",
        "value": "getContracts"
      }
    ]
  }
]