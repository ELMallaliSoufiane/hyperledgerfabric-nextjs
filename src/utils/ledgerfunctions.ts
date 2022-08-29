import { connect } from "@hyperledger/fabric-gateway";
import { CHAINCODE_NAME, CHANNEL_NAME } from "../globals";
import { Asset } from "../types";
import {
  getGatewayClient,
  newGrpcConnection,
  newIdentity,
  newSigner,
} from "./connection";

export const InitLedger = async (): Promise<void> => {
  const { gateway, client } = await getGatewayClient();

  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    await contract.submitTransaction("InitLedger");
  } finally {
    gateway.close();
    client.close();
  }
};

export const createAsset = async (asset: Asset): Promise<string> => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    await contract.submitTransaction(
      "CreateAsset",
      asset.ID,
      asset.Color,
      asset.Size,
      asset.Owner,
      asset.AppraisedValue
    );

    return "Created successfully";
  } finally {
    gateway.close();
    client.close();
  }
};

export const readAsset = async (ID: string): Promise<Asset> => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes = await contract.evaluateTransaction("ReadAsset", ID);
    const result = Buffer.from(resultbytes).toString("utf-8");
    const asset = JSON.parse(result) as Asset;
    return asset;
  } finally {
    gateway.close();
    client.close();
  }
};

export const transferAsset = async (
  ID: string,
  Owner: string
): Promise<void> => {
  const client = await newGrpcConnection();
  const gateway = connect({
    client,
    identity: await newIdentity(),
    signer: await newSigner(),
    evaluateOptions: () => {
      return { deadline: Date.now() + 5000 }; // 5 seconds
    },
    endorseOptions: () => {
      return { deadline: Date.now() + 15000 }; // 15 seconds
    },
    submitOptions: () => {
      return { deadline: Date.now() + 5000 }; // 5 seconds
    },
    commitStatusOptions: () => {
      return { deadline: Date.now() + 60000 }; // 1 minute
    },
  });
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    await contract.submitTransaction("TransferAsset", ID, Owner);
  } finally {
    gateway.close();
    client.close();
  }
};

export const updateAsset = async (asset: Asset) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    await contract.submitTransaction(
      "UpdateAsset",
      asset.ID,
      asset.Color,
      asset.Size,
      asset.Owner,
      asset.AppraisedValue
    );
  } finally {
    gateway.close();
    client.close();
  }
};

export const deleteAsset = async (ID: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    await contract.submitTransaction("DeleteAsset", ID);
  } finally {
    gateway.close();
    client.close();
  }
};

export const getAllAssets = async (): Promise<Asset[]> => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    const resultbytes = await contract.evaluateTransaction("GetAllAssets");
    const result = Buffer.from(resultbytes).toString("utf-8");
    const assets = JSON.parse(result) as Asset[];
    return assets;
  } finally {
    gateway.close();
    client.close();
  }
};

export const getAssetHistory = async (assetId: string) => {
  const { gateway, client } = await getGatewayClient();

  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes = await contract.evaluateTransaction(
      "GetAssetHistory",
      assetId
    );
    const result = Buffer.from(resultbytes).toString("utf-8");
    const history = JSON.parse(result);
    return history;
  } finally {
    gateway.close();
    client.close();
  }
};

export const filterbyName = async (name: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes = await contract.evaluateTransaction(
      "FilterbyName",
      name
    );
    const result = Buffer.from(resultbytes).toString("utf-8");
    return JSON.parse(result);
  } finally {
    gateway.close();
    client.close();
  }
};

export const filterbyValue = async (max: string, min?: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes =
      typeof min === "undefined"
        ? await contract.evaluateTransaction("FilterbyValue", max)
        : await contract.evaluateTransaction("FilterbyValue", max, min);
    const result = Buffer.from(resultbytes).toString("utf-8");
    return JSON.parse(result);
  } finally {
    gateway.close();
    client.close();
  }
};

export const filterbyOwner = async (owner: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes = await contract.evaluateTransaction(
      "FilterbyOwner",
      owner
    );
    return JSON.parse(Buffer.from(resultbytes).toString("utf-8"));
  } finally {
    gateway.close();
    client.close();
  }
};

export const getTransactionById = async (TxId: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract("qscc");
    const resultbytes = await contract.evaluateTransaction(
      "GetTransactionByID",
      TxId
    );
    return Buffer.from(resultbytes).toString("utf-8");
  } finally {
    gateway.close();
    client.close();
  }
};

export const queryLedger = async (query: string) => {
  const { gateway, client } = await getGatewayClient();
  try {
    const network = gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);
    const resultbytes = await contract.evaluateTransaction(
      "QueryLedger",
      query
    );
    return JSON.parse(Buffer.from(resultbytes).toString("utf-8"));
  } finally {
    gateway.close();
    client.close();
  }
};

export const TransactionHistory = async () => {
  /*
  getting transactions is not possible for the moment, it's a bug in the way the Gateway selects peers 
  to use when evaluating a system chaincode, The bug is fixed and will be published in Fabric v2.4.4. ( to be released soon!)

  [ 
       {
      timestamp,
      transaction function [create, update, transfer, delete],
      payload
    }
  ]
  */
};
