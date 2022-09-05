import dayjs from "dayjs"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';


dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export async function verifyExpirationCard(data: string) {
    const validateDate = dayjs().isSameOrBefore(dayjs(data, 'MM/YY'))
    if (!validateDate) {
        throw {status: 'Bad Request', message: 'Cartão Expirado'}
    }
}