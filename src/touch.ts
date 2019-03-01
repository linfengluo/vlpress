/**
 * Created by linfengluo@gmail.com on 2019/2/28.
 */
const DEFAULT_INTERVAL = 1000
class Touch {
    private startTime: number = 0;
    private isHandleBack: boolean = false;
    private options: any = {
        interval: DEFAULT_INTERVAL,             //长按间隔时间 毫秒
        autoHandle: true,                       //自动触发长按回调
        isHideDefaultMenu: true,                //屏蔽默认菜单
    };
    private timmer: any = null;
    private callback: any

    constructor(el: any, callback: any, options?: any) {
        this.callback = callback
        this.options = (<any>Object).assign(this.options, options)

        el.addEventListener('touchstart', this.touchStart.bind(this))
        el.addEventListener('touchend', this.touchEnd.bind(this))

        el.addEventListener('mousedown', this.touchStart.bind(this))
        el.addEventListener('mouseout', this.handleCancel.bind(this))
        el.addEventListener('mouseup', this.touchEnd.bind(this))

        el.style.cursor = 'pointer'
        el.style.webkitUserSelect = 'none'

        //屏蔽长按菜单
        if (this.options.isHideDefaultMenu) {
            el.addEventListener('contextmenu', (e: any) => {
                e.preventDefault();
            });
        }
    }

    private handleCancel(): void{
        this.toggleStatus(true)
    }
    private toggleStatus(status: boolean = false): void {
        this.isHandleBack = status
    }
    private touchStart(): void {
        clearTimeout(this.timmer)
        this.toggleStatus()
        this.startTime = new Date().valueOf()

        if (this.options.autoHandle) {
            this.timmer = setTimeout(this.handleCallback.bind(this), this.options.interval)
        }
    }

    private touchEnd(): void {
        this.isLongPress() && this.handleCallback()
    }

    private isLongPress(): boolean {
        const endTime = new Date().valueOf()
        return (endTime - this.startTime) > this.options.interval
    }

    private handleCallback(): void {
        !this.isHandleBack && typeof this.callback === 'function' && this.callback()
        this.toggleStatus(true)
    }
}

export default Touch
