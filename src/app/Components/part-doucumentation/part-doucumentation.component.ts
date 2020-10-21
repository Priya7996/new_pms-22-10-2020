import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-part-doucumentation',
  templateUrl: './part-doucumentation.component.html',
  styleUrls: ['./part-doucumentation.component.scss']
})
export class PartDoucumentationComponent implements OnInit {

  constructor(private nav:NavbarService) {
    this.nav.show()

   }

  ngOnInit() {
  }

}
