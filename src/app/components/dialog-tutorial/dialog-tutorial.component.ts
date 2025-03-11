import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdHoursBase } from "../../interfaces/prod-hours-base";

/* DIALOG */
@Component({
  selector: "dialog-tutorial-component",
  templateUrl: './dialog-tutorial.component.html',
  styleUrl: './dialog-tutorial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTutorialComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
    },
  ) {
  }
  playingFullscreen = false;
  playFullscreen(video: any) {
    if (video.target.requestFullscreen && !this.playingFullscreen) {
      this.playingFullscreen = true;
      video.target.requestFullscreen();
    }
  }
}