/// <reference lib="dom" />
type EventHandlerInput = any;

type EventName = string;

type EventParams = {
  name: string;
  product?: string;
  category?: string;
  method?: string;
  value?: string;
};

class Tracker {
  private static instance: Tracker | null;

  private version: string;
  private debug: boolean;
  private sendWhenDebug: boolean;
  private domain?: string;
  public initiated: boolean;
  private apiURL?: string;
  private clientId?: string;

  constructor() {
    this.version = "0.0.1";
    this.debug = false;
    this.sendWhenDebug = false;
    this.initiated = false;
  }

  public static getInstance(): Tracker {
    if (!Tracker.instance) {
      Tracker.instance = new Tracker();
    }
    return Tracker.instance;
  }

  public init(domain: string, debug?: boolean, sendWhenDebug?: boolean) {
    const tracker = Tracker.getInstance();
    if (tracker.initiated) throw new Error("Tracker already initiated.");
    tracker.domain = domain;
    tracker.apiURL = "/track";
    tracker.clientId = tracker.getClientId();
    if (debug !== undefined) tracker.debug = debug;
    if (sendWhenDebug !== undefined) tracker.sendWhenDebug = sendWhenDebug;
    tracker.initiated = true;
  }

  public getClientId(): string {
    const cookies = document.cookie
      .split("; ")
      .map((a) => a.split("="))
      .filter((c) => c[0] === "kaia-cid");
    const exists = cookies.length == 1;
    if (!exists) {
      const id =
        (Math.random().toString(16) + "000000000").substr(2, 8) +
        "." +
        Math.floor(new Date().getTime()) +
        "." +
        Math.floor(performance.now());
      document.cookie = `kaia-cid=${id}; max-age=60*60*24*365*2; SameSite=lax; Secure`;
      return id;
    }
    return cookies[0][1];
  }

  private log(message: string) {
    console.log("[tracker] " + message);
  }

  public send(event: EventParams | EventName) {
    if (!this.initiated) return;
    const hostname = window.location.hostname;
    if (
      (!this.sendWhenDebug && hostname === "localhost") ||
      hostname === "127.0.0.1" ||
      hostname === "127.0.0.1:3000"
    ) {
      this.log("Event not send on localhost");
      return;
    }
    console.log("hostname", hostname);
    if (this.debug && !this.sendWhenDebug) {
      this.log("Event not send in debug mode");
      return;
    }
    if (window.localStorage.getItem("tracker-ignore")) {
      this.log("Event ignored");
      return;
    }
    const params: EventHandlerInput = {
      v: this.version,
      c: this.clientId,
      u: document.URL,
      d: this.domain || document.domain,
      p: document.location.pathname,
      r: document.referrer,
      w: window.innerWidth.toString(),
      // utm_medium: url('utm_medium'),
      // utm_source: url('utm_source'),
      // utm_campaign: url('utm_campaign'),
      // utm_content: url('utm_content'),
      ...(typeof event !== "string"
        ? {
            b: event.product,
            en: event.name,
            ec: event.category,
            em: event.method,
            ev: event.value,
          }
        : { en: event }),
    };
    Object.keys(params).forEach(
      (key) =>
        !params[key as keyof EventHandlerInput] &&
        delete params[key as keyof EventHandlerInput]
    );
    let request = new XMLHttpRequest();
    const url = `${this.apiURL}?${new URLSearchParams(params).toString()}`;
    request.open("GET", url);
    request.withCredentials = true;
    if (!this.debug) {
      console.log("[track-debug] Event request aborted:", url);
      request.abort();
    } else {
      request.send();
    }
    return 0;
  }
}

let singletonTracker: Tracker = Tracker.getInstance();

export default singletonTracker;
