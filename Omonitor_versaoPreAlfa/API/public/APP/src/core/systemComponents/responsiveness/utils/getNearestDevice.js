/**
 * @param {number} width - Largura da viewport em pixels.
 * @param {Array} devices - Lista de dispositivos.
 * @returns {Object|null}
 */
export function getNearestDevice(width, devices = DEFAULT_DEVICES) {

    if (!Array.isArray(devices) || devices.length === 0)
        return null;

    let nearest = devices[0];
    let minDifference = Math.abs(width - nearest.width);

    for (let i = 1; i < devices.length; i++) {

        const difference = Math.abs(width - devices[i].width);

        if (difference < minDifference) {
            minDifference = difference;
            nearest = devices[i];
        }

    }

    return nearest;

}