import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  items = [
    { imageUrl: 'assets/images/skills/logo_angular.gif', text: 'Angular' },
    { imageUrl: 'assets/images/skills/logo_git.svg', text: 'Git' },
    { imageUrl: 'assets/images/skills/logo_github_light.svg', text: 'Github' },
    { imageUrl: 'assets/images/skills/logo_html.svg', text: 'HTML' },
    { imageUrl: 'assets/images/skills/logo_ts.svg', text: 'Typescript' },
    { imageUrl: 'assets/images/skills/logo_vscode.svg', text: 'Visual Studio Code' },
    { imageUrl: 'assets/images/skills/logo_css.svg', text: 'CSS' },
    { imageUrl: 'assets/images/skills/logo_js.svg', text: 'Javascript' },
    { imageUrl: 'assets/images/skills/logo_jasmine.svg', text: 'Jasmine' },
    { imageUrl: 'assets/images/skills/logo_karma.svg', text: 'Karma' },
    { imageUrl: 'assets/images/skills/logo_bootstrap.svg', text: 'Bootstrap' },
    { imageUrl: 'assets/images/skills/logo_eslint.svg', text: 'ESLint' },
    { imageUrl: 'assets/images/skills/logo_postman.svg', text: 'Postman' },
    { imageUrl: 'assets/images/skills/logo_php.svg', text: 'PHP' },
    { imageUrl: 'assets/images/skills/logo_mariadb.svg', text: 'MariaDB' },
  ];
}
