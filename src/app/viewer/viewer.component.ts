import { Component, OnInit } from '@angular/core';
import {
  ViewerOptions,
  ViewingApplicationInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension,
  ItemLoadedEvent,
} from 'ng2-adsk-forge-viewer';
import { AppService } from '../app.service';

// tslint:disable-next-line:prefer-const
declare const THREE: any;

export const DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXJtb3JpcXVlLzIwQXJtb3JpcXVlMi5ydnQ';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {


  title = 'BMSPi';

  name = 'Angular Forge Viewer';
  public viewerOptions: ViewerOptions;
  public documentId: string;
  public viewer3d: Autodesk.Viewing.Viewer3D;
  public position2Dsensor2: THREE.Vector3;
  public position2Dsensor1: THREE.Vector3;
  public errorMessage: string;

  constructor(private appService: AppService) { }

  public ngOnInit() {
    this.viewerOptions = {
      initializerOptions: {
        env: 'AutodeskProduction',
        getAccessToken: (onGetAccessToken: (token: string, expire: number) => void) => {
          const expireTimeSeconds = 60 * 30;
          this.appService.getToken().subscribe(
            token => {
              onGetAccessToken(token.access_token, expireTimeSeconds);
            },
            error => (this.errorMessage = error)
          );
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
      const point2 = this.viewer3d.worldToClient(new THREE.Vector3(-5.212462642869166, -9.990753140834208, -3.4448819160461426));
      this.position2Dsensor2 = new THREE.Vector3(point2.x, point2.y, point2.z);

      // convert 3D position to 2D screen coordination
      const point1 = this.viewer3d.worldToClient(new THREE.Vector3(9.969990863926704, -4.275324379352721, -3.4448819160461426));
      this.position2Dsensor1 = new THREE.Vector3(point1.x, point1.y, point1.z);

    });
  }

  public onClickEvent(event: MouseEvent) {
    console.log(event.clientX);
    console.log(event.clientY);

    // get the selected 3D position of the object
    console.log(this.viewer3d.clientToWorld(event.clientX, event.clientY));

  }

}
