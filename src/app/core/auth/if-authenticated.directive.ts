import {
  DestroyRef,
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true,
})
export class IfAuthenticatedDirective<T> implements OnInit {
  private templateRef: TemplateRef<T> = inject(TemplateRef);
  private authService = inject(AuthService);
  private viewContainer = inject(ViewContainerRef);
  destroyRef = inject(DestroyRef);

  condition = false;
  hasView = false;

  async ngOnInit() {
    const isAuthenticated = await this.authService.isAuthenticated();
    const authRequired = isAuthenticated && this.condition;
    const unauthRequired = !isAuthenticated && !this.condition;

    if ((authRequired || unauthRequired) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  @Input() set ifAuthenticated(condition: boolean) {
    this.condition = condition;
  }
}
