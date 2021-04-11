import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { authorization } from "../../config/authorization.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authorization.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      username: payload.username,
      role: payload.role,
      userType: payload.userType,
      branchId: payload.branchId,
      organizationId: payload.organizationId,
      sub: payload.sub,
    };
  }
}
