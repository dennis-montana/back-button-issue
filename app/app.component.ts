import { Component, OnDestroy, OnInit } from '@angular/core';
import { android, AndroidActivityEventData, AndroidApplication } from 'tns-core-modules/application';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit, OnDestroy {

    public ngOnInit(): void {
        console.log('AppComponent ngOnInit');

        /**
         * Added this so you can see that this event is added multiple times and never removed when pressing
         * the Android back button, because ngOnDestroy isn't called.
         */
        android.on(AndroidApplication.activityResumedEvent, this.handleResumeEvent);

        // This native event is being called when we press the back button on Android
        android.on(AndroidApplication.activityDestroyedEvent, (args: AndroidActivityEventData) => {
            if (args.activity.toString().startsWith('com.tns.NativeScriptActivity')) {
                console.log('Android acitivity destroyed');
            }
        });
    }

    // This never gets called when we press the back button on Android
    public ngOnDestroy(): void {
        console.log('AppComponent ngOnDestroy');

        android.off(AndroidApplication.activityResumedEvent, this.handleResumeEvent);

        android.off(AndroidApplication.activityDestroyedEvent);
    }

    private handleResumeEvent = (): void => {
        console.log('handleResumeEvent');
    }
}
