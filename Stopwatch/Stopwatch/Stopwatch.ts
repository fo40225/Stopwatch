class Stopwatch {
    private elapsed: number;
    private startTimeStamp: number;
    private isRunning: boolean;

    public IsRunning(): boolean {
        return this.isRunning;
    }

    public static IsHighResolution: boolean;

    public ElapsedMilliseconds(): number {
        return Math.round(this.GetRawElapsedMilliseconds() * 10000) / 10000;
    }

    //static constructor
    static initialize() {
        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            Stopwatch.IsHighResolution = true;
        } else {
            Stopwatch.IsHighResolution = false;
        }
    }

    public constructor() {
        this.Reset();
    }

    Start(): void {
        if (!this.isRunning) {
            this.startTimeStamp = this.GetTimestamp();
            this.isRunning = true;
        }
    }

    static StartNew(): Stopwatch {
        var s: Stopwatch = new Stopwatch();
        s.Start();
        return s;
    }

    Stop(): void {
        if (this.isRunning) {
            var endTimeStamp: number = this.GetTimestamp();
            var elapsedThisPeriod: number = endTimeStamp - this.startTimeStamp;
            this.elapsed += elapsedThisPeriod;
            this.isRunning = false;

            if (this.elapsed < 0) {
                this.elapsed = 0;
            }
        }
    }

    Reset(): void {
        this.elapsed = 0;
        this.isRunning = false;
        this.startTimeStamp = 0;
    }

    Restart(): void {
        this.elapsed = 0;
        this.startTimeStamp = this.GetTimestamp();
        this.isRunning = true;
    }

    private GetRawElapsedMilliseconds(): number {
        var timeElapsed: number = this.elapsed;

        if (this.isRunning) {
            var currentTimeStamp: number = this.GetTimestamp();
            var elapsedUntilNow: number = currentTimeStamp - this.startTimeStamp;
            timeElapsed += elapsedUntilNow;
        }
        return timeElapsed;
    }

    private GetTimestamp(): number {
        if (Stopwatch.IsHighResolution) {
            return performance.now();
        }
        else {
            return (new Date()).getTime();
        }
    }
}
Stopwatch.initialize();