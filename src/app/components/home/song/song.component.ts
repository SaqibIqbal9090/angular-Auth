import { Component ,ElementRef,EventEmitter,OnInit, Output, ViewChild} from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { AudioPlayerComponent } from 'ngx-audio-player';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  constructor(private songsservice:AuthService){}
  
  popularsongs:any=[];
  Trendingsongs:any=[];
  currentSongIndex: number = 0;

  ngOnInit(): void {
    this.getPopularsongs();
    this.getTrendingsongs();
  }


  getPopularsongs(){
    this.songsservice.fetchPopularSongs().valueChanges().subscribe((result)=>{
      this.popularsongs=result
      console.log(this.popularsongs)
     })
  }
  getTrendingsongs(){
    this.songsservice.fetchTrendingSongs().valueChanges().subscribe((result)=>{
      this.Trendingsongs=result
      console.log(this.Trendingsongs)
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
