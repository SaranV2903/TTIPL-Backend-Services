const dotEnv = require("dotenv");
dotEnv.config();
const azure = require("azure-storage");
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const config = require("./config.json");
const account = "storageaccountipl";
const accountKey =
    "X6cU3HH+KhShGAYH45gNQkUkCNLnThkBRsq+t+PA6zdhuTeoidqVIHrq1bpx2g3f6azZ/erZdqr0B/bcF5Qk2w==";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

function generateUrl(containerName, blobName, type) {
    var blobService = {},
        sasPerm = "";

    blobService = azure.createBlobService(
        config.azure.blobAccount,
        config.azure.blobAzureKey
    );
    if (type === "r") {
        sasPerm = azure.BlobUtilities.SharedAccessPermissions.READ;
    }

    let sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: sasPerm,
            Expiry: azure.date.minutesFromNow(70),
        },
    };

    let token = blobService.generateSharedAccessSignature(
        containerName,
        blobName,
        sharedAccessPolicy
    );
    let sasUrl = blobService.getUrl(containerName, blobName, token, true);
    console.log(token);
    console.log(sasUrl);
    return {
        requestUri: sasUrl,
        requestType: type,
    };
}


module.exports = { 
	generateUrl
}