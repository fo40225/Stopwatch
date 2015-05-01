var Stopwatch = (function () {
    function Stopwatch() {
        this.Reset();
    }
    Stopwatch.prototype.IsRunning = function () {
        return this.isRunning;
    };
    Stopwatch.prototype.ElapsedMilliseconds = function () {
        return Math.round(this.GetRawElapsedMilliseconds() * 10000) / 10000;
    };
    //static constructor
    Stopwatch.initialize = function () {
        if (typeof performance !== "undefined" && typeof performance.now === "function") {
            Stopwatch.IsHighResolution = true;
        }
        else {
            Stopwatch.IsHighResolution = false;
        }
    };
    Stopwatch.prototype.Start = function () {
        if (!this.isRunning) {
            this.startTimeStamp = this.GetTimestamp();
            this.isRunning = true;
        }
    };
    Stopwatch.StartNew = function () {
        var s = new Stopwatch();
        s.Start();
        return s;
    };
    Stopwatch.prototype.Stop = function () {
        if (this.isRunning) {
            var endTimeStamp = this.GetTimestamp();
            var elapsedThisPeriod = endTimeStamp - this.startTimeStamp;
            this.elapsed += elapsedThisPeriod;
            this.isRunning = false;
            if (this.elapsed < 0) {
                this.elapsed = 0;
            }
        }
    };
    Stopwatch.prototype.Reset = function () {
        this.elapsed = 0;
        this.isRunning = false;
        this.startTimeStamp = 0;
    };
    Stopwatch.prototype.Restart = function () {
        this.elapsed = 0;
        this.startTimeStamp = this.GetTimestamp();
        this.isRunning = true;
    };
    Stopwatch.prototype.GetRawElapsedMilliseconds = function () {
        var timeElapsed = this.elapsed;
        if (this.isRunning) {
            var currentTimeStamp = this.GetTimestamp();
            var elapsedUntilNow = currentTimeStamp - this.startTimeStamp;
            timeElapsed += elapsedUntilNow;
        }
        return timeElapsed;
    };
    Stopwatch.prototype.GetTimestamp = function () {
        if (Stopwatch.IsHighResolution) {
            return performance.now();
        }
        else {
            return (new Date()).getTime();
        }
    };
    return Stopwatch;
})();
Stopwatch.initialize();
//# sourceMappingURL=Stopwatch.js.map