import { SessionData, Store } from 'express-session';
import { Session } from './session.model';
import { Op } from 'sequelize';

const SESSION_LIFETIME = 10 * 1000 * 60;

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
  public destroy(sid: string, callback?: (err?: unknown) => void) {
    console.log(sid);
    callback && callback();
  }

  private async findUnexpiredSession(sid: string): Promise<Session | null> {
    const session = await Session.findOne({
      where: { sessionId: sid, expiredAt: { [Op.gt]: new Date() } },
    });

    return session;
  }

  private async upsertSession(sid: string, sessionData: SessionData) {
    const currentTime = new Date();
    const newExpiration = new Date(currentTime.getTime() + SESSION_LIFETIME);

    const existingSession = await this.findUnexpiredSession(sid);
    if (!existingSession) {
      const session = await Session.create({
        sessionId: sid,
        json: sessionData,
        expiredAt: newExpiration,
      });
      return session;
    } else {
      existingSession.json = sessionData;
      existingSession.expiredAt = newExpiration;
      await existingSession.save();
      return existingSession;
    }
  }
}
