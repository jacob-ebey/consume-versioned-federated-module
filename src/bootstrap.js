import logHello from "versioned-federated-module/utils/log-hello";
import version from "versioned-federated-module/utils/version";

logHello("Consumer");

console.log(`versioned-federated-module@${version()}`);
