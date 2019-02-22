import { Component, OnInit } from '@angular/core';
import {
  ViewerOptions,
  ViewingApplicationInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension,
  ItemLoadedEvent,
} from 'ng2-adsk-forge-viewer';

// tslint:disable-next-line:prefer-const
declare const THREE: any;

// Insert a token and a document URN here
// Then refresh the app
export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJlYVNTclN0bWo0SXVOZ1AzR1hhSlRxYnF0YjAwQWxURiIsImV4cCI6MTU1MDg3MDU0NCwic2NvcGUiOlsidmlld2FibGVzOnJlYWQiXSwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2p3dGV4cDYwIiwianRpIjoiVEhGZVEyZE5SbHAxSTE2Z0JWNkx4UDVId2lrVGpMR2lyTG1FOU03aGl3bHh0bUVzREJCUG9GS0RMcFpFTnFsdyJ9.GqTpLRj7b5r-WTgMkWFPmCqGjujpNxLcNbp7Ik3GO9A';
export const DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXJtb3JpcXVlLzIwQXJtb3JpcXVlMi5ydnQ';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'BMSPi';

  name = 'Angular Forge Viewer';
  public viewerOptions: ViewerOptions;
  public documentId: string;
  public viewer3d: Autodesk.Viewing.Viewer3D;
  public position2D: THREE.Vector3;

  public ngOnInit() {
    this.viewerOptions = {
      initializerOptions: {
        env: 'AutodeskProduction',
        getAccessToken: (onGetAccessToken: (token: string, expire: number) => void) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(ACCESS_TOKEN, expireTimeSeconds);
        },
      },
      viewerConfig: {
        extensions: [
          'Autodesk.DocumentBrowser',
        ],
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        // Extension.registerExtension(MyExtension.extensionName, MyExtension);
      },
      onViewingApplicationInitialized: (args: ViewingApplicationInitializedEvent) => {
        args.viewerComponent.DocumentId = DOCUMENT_URN;
      },
      // showFirstViewable: false,
      // headlessViewer: true,
    };
  }

  public selectionChanged(event: SelectionChangedEventArgs) {
    console.log('selectionChanged' + event.dbIdArray);
  }

  public documentChanged(event: DocumentChangedEvent) {
    console.log(event.document);
  }

  public itemLoadedEvent(event: ItemLoadedEvent) {
    console.log(event.viewerComponent);
    this.viewer3d = event.viewerComponent.Viewer3D;

    this.viewer3d.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, (viewerEvent: Autodesk.Viewing.ViewerEvent) => {


      // convert 3D position to 2D screen coordination
      const point = this.viewer3d.worldToClient(new THREE.Vector3(9.969990863926704, -4.275324379352721, -3.4448819160461426));

      this.position2D = new THREE.Vector3(point.x, point.y, point.z);

      console.log(this.position2D);

    });
  }

  public onClickEvent(event: MouseEvent) {
    console.log(event.clientX);
    console.log(event.clientY);

    // get the selected 3D position of the object
    console.log(this.viewer3d.clientToWorld(event.clientX, event.clientY));

  }

}
