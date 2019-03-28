// throw error instead of logging (this is used when testing controllers)
console.error = function (message) {
    throw (message instanceof Error ? message : new Error(message));
};