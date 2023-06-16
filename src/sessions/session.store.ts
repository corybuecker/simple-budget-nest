import { SessionData, Store } from 'express-session';
import { Op } from 'sequelize';
import { Session } from './session.model';

// 10 minutes
const SESSION_LIFETIME = 1000 * 60 * 10;

export default class SessionStore extends Store {
  constructor() {
    super();
  }

  public async get(
    sid: string,
    callback: (err: unknown, session?: SessionData | null) => void,
  ) {
    try {
      const session = await this.findUnexpiredSession(sid);
      if (!session) {
        return callback(null, null);
      }
      return callback(null, session.json);
    } catch (err) {
      callback(err, null);
    }
  }
  public async set(
    sid: string,
    session: SessionData,
    callback?: (err?: unknown) => void,
  ) {
    try {
      await this.upsertSession(sid, session);

      return callback && callback(null);
    } catch (e) {
      return callback && callback(e);
    }
  }

  public async touch(
    sid: string,
    session: SessionData,
    callback?: (err?: unknown) => void,
  ) {
    await this.touchSession(sid);

    return callback && callback(null);
  }

  public destroy(sid: string, callback?: (err?: unknown) => void) {
    callback && callback();
  }

  private async findUnexpiredSession(sid: string) {
    return Session.findOne({
      where: { sessionId: sid, expiredAt: { [Op.gt]: new Date() } },
    });
  }

  private async touchSession(sid: string) {
    const currentTime = new Date();
    const newExpiration = new Date(currentTime.getTime() + SESSION_LIFETIME);

    const existingSession = await this.findUnexpiredSession(sid);

    if (existingSession) {
      existingSession.expiredAt = newExpiration;
      return existingSession.save();
    }
  }

  private async upsertSession(sid: string, sessionData: SessionData) {
    const currentTime = new Date();
    const newExpiration = new Date(currentTime.getTime() + SESSION_LIFETIME);

    const existingSession = await this.findUnexpiredSession(sid);

    if (!existingSession) {
      return Session.create({
        sessionId: sid,
        json: sessionData,
        expiredAt: newExpiration,
      });
    } else {
      existingSession.json = sessionData;
      existingSession.expiredAt = newExpiration;
      return existingSession.save();
    }
  }
}
