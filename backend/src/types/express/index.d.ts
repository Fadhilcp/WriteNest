import { AccessTokenPayload } from "../tokenPayload.type"

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload
        }
    }
}