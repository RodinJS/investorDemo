class Device {
    constructor() {
    }

    /**
     * Checks if the current device is an iPhone
     * @returns {boolean}
     */
    get isIPhone() {
        return /iPhone/.test(navigator.userAgent) && !window.MSStream
    }

    /**
     * Checks if the current device is an iPad
     * @returns {boolean}
     */
    get isIPad() {
        return /iPad/.test(navigator.userAgent) && !window.MSStream
    }

    /**
     * Checks if the current device is an iPod
     * @returns {boolean}
     */
    get isIPod() {
        return /iPod/.test(navigator.userAgent) && !window.MSStream
    }

    /**
     * Checks if the current device runs iOS (iPhone, iPad, iPod)
     * @returns {boolean}
     */
    get isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    get isMac() {
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    };

    /**
     * Checks if the current device is mobile (Android, webOS, iPhone, iPad, iPod, BlackBerry, Windows Phone)
     * @returns {boolean}
     */
    get isMobile() {
        return /Android/i.test(navigator.userAgent) || /webOS/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent) || /BlackBerry/i.test(navigator.userAgent) || /Windows Phone/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current device is mobile (Android)
     * @returns {boolean}
     */
    get isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    /**
     * Gets the current version of iOS
     * returns null if not iOS
     * @returns {string|null}
     */
    get iOSVersion() {
        if (!this.isIOS)
            return null;

        if (!!window.indexedDB)
            return '8+';

        if (!!window.SpeechSynthesisUtterance)
            return '7';

        if (!!window.webkitAudioContext)
            return '6';

        if (!!window.matchMedia)
            return '5';

        if (!!window.history && 'pushState' in window.history)
            return '4';
    }

    /**
     * Checks if we are running inside an iframe
     * @returns {boolean}
     */
    get isIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     * Checks if the device is Oculus
     * @returns {boolean}
     */
    get isOculus() {
        if (this.webVRmanager && this.webVRmanager.hmd) {
            return /oculus/i.test(this.webVRmanager.hmd.displayName);
        }
        return null;
    }

    /**
     * Checks if the device is HTC Vive
     * @returns {boolean}
     */
    get isVive() {
        if (this.webVRmanager && this.webVRmanager.hmd) {
            return /OpenVR/i.test(this.webVRmanager.hmd.displayName);
        }
        return null;
    }


    get browser() {
        const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        const isFirefox = typeof InstallTrigger !== 'undefined';
        const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        const isEdge = !isIE && !!window.StyleMedia;
        const isChrome = !!window.chrome && !!window.chrome.webstore;

        switch (true) {
            case isOpera:
                return 'opera';
            case isFirefox:
                return 'firefox';
            case isSafari:
                return 'safari';
            case isIE:
                return 'IE';
            case isEdge:
                return 'edge';
            case isChrome:
                return 'chrome';

            default:
                return 'unknown';
        }
    }
}

export const device = new Device();