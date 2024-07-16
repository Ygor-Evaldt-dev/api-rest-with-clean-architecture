import { sign, verify } from "jsonwebtoken";

import { ITokenProvider } from "@/domain/ports/token-provider.interface";

export class JwtAdapter implements ITokenProvider {
	constructor(private readonly secret: string) {}

	generate(data: string | object): string {
		return sign(data, this.secret, { expiresIn: "1d" });
	}
	validate(token: string): string | object {
		return verify(token, this.secret);
	}
}
