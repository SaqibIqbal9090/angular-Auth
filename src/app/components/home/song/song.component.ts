import { Component ,ElementRef,EventEmitter,OnInit, Output, ViewChild} from '@angular/core';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  constructor(private songsservice:AuthService){}
  
  onlineSongs:any=[];
  currentSongIndex: number = 0;

  ngOnInit(): void {
    this.getsongs();
  }


  getsongs(){
    this.songsservice.fetchSongs().valueChanges().subscribe((result)=>{
      this.onlineSongs=result
      console.log(this.onlineSongs)
     })
  }
  @ViewChild('audioPlayers') audioPlayer!: ElementRef<any>;
  audioSource :string= '';
  PlaySong(url:any) {
    this.audioSource = url;
    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
  }

}
