import * as jose from 'jose'
import { Config } from '@/app/constant';

const secretKey = process.env.JWT_SECRET;

export async function createToken(data: any) {
    const payload = {
        year: data.year,
        role: data.role
    };
    const encoder = new TextEncoder();
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('6d') //1h
        .sign(encoder.encode(secretKey));

    return token;
}

export async function verifyToken(req: any) {
    try {
        const token = req.cookies.get('token').value;
        const encoder = new TextEncoder();
        const { payload } = await jose.jwtVerify(token, encoder.encode(secretKey));

        return { payload: payload, status: 200 };

    } catch (error) {
        if (error instanceof jose.errors.JWTExpired) {
            return { payload: null, status: 401, message: "Token Expired" };
        }
        else {
            return { payload: null, status: 403, message: "Token Invalid" };
        }
    }
}
