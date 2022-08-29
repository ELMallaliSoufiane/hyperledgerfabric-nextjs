import * as path from "path";

export const CRYPTO_PATH = envOrDefault(
  "CRYPTO_PATH",
  path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "test-network",
    "organizations",
    "peerOrganizations",
    "org1.example.com"
  )
);

export const KEY_DIRECTORY_PATH = envOrDefault(
  "KEY_DIRECTORY_PATH",
  path.resolve(
    CRYPTO_PATH,
    "users",
    "User1@org1.example.com",
    "msp",
    "keystore"
  )
);

export const CERT_PATH = envOrDefault(
  "CERT_PATH",
  path.resolve(
    CRYPTO_PATH,
    "users",
    "User1@org1.example.com",
    "msp",
    "signcerts",
    "cert.pem"
  )
);

export const TLS_CERT_PATH = envOrDefault(
  "TLS_CERT_PATH",
  path.resolve(CRYPTO_PATH, "peers", "peer0.org1.example.com", "tls", "ca.crt")
);
export const PEER_ENDPOINT = "localhost:7051";
export const PEER_HOST_ALIAS = "peer0.org1.example.com";
export const CHANNEL_NAME = "mychannel";
export const CHAINCODE_NAME = "basic";
export const MSP_ID = "Org1MSP";
export const APIKEY =
  "KwhO0XSf3m5qrGqe4Y1ZB5mb0QakOL8bPviaa7wQ7HVJ1TuoGyCyiv4rSF44VJtPdiqDFA";

function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}
