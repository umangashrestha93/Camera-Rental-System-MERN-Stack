export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const normalizePayloadToFormData = (payload) => {
    let normalizedPayload = new FormData();

    Object.keys(payload).forEach((key) => {
        const values = payload[key];

        if (Array.isArray(values)) {
            values.forEach((value) => {
                let data = value;
                normalizedPayload.append(key, data);
            });

            return;
        }

        return normalizedPayload.append(key, values);
    });

    return normalizedPayload;
};
