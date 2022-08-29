import * as grpc from "@grpc/grpc-js";
import * as crypto from "crypto";
import * as path from "path";
import {
  connect,
  Identity,
  Signer,
  signers,
} from "@hyperledger/fabric-gateway";
import { promises as fs } from "fs";
import {
  CERT_PATH,
  KEY_DIRECTORY_PATH,
  MSP_ID,
  PEER_ENDPOINT,
  PEER_HOST_ALIAS,
  TLS_CERT_PATH,
} from "../globals";

export const newGrpcConnection = async (): Promise<grpc.Client> => {
  const tlsRootCert = await fs.readFile(TLS_CERT_PATH);
  const tlsCredentials = await grpc.credentials.createSsl(tlsRootCert);

  return new grpc.Client(PEER_ENDPOINT, tlsCredentials, {
    "grpc.ssl_target_name_override": PEER_HOST_ALIAS,
  });
};

export const newIdentity = async (): Promise<Identity> => {
  const credentials = await fs.readFile(CERT_PATH);
  console.log("certpath", CERT_PATH);
  return { mspId: MSP_ID, credentials };
};

export const newSigner = async (): Promise<Signer> => {
  const files = await fs.readdir(KEY_DIRECTORY_PATH);
  const keypath = path.join(KEY_DIRECTORY_PATH, files[0] as string);
  console.log("keypath", keypath);
  const privateKeyPem = await fs.readFile(keypath);
  const privateKey = await crypto.createPrivateKey(privateKeyPem);
  console.log("privateKey", privateKey);
  return signers.newPrivateKeySigner(privateKey);
};

export const getGatewayClient = async () => {
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

  return { gateway, client };
};
