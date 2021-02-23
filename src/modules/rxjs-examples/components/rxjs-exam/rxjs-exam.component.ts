// Dependencies
import { Component, ElementRef, Renderer2, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Observable, Subscription, of, interval, merge, pipe, OperatorFunction, fromEvent, EMPTY } from 'rxjs';
import { mergeAll, map, mapTo, flatMap, switchMap, audit, take, buffer, isEmpty, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-exam',
  templateUrl: './rxjs-exam.component.html',
  styleUrls: ['./rxjs-exam.component.less']
})
export class RxjsExComponent implements OnInit, AfterViewInit {

  @ViewChild('oc') oc: ElementRef;
  @ViewChild('bufferButton') bufferButton: ElementRef;
  private observable$: Observable<string>;
  private textObserver: Subscription;

  constructor(
    private renderer2: Renderer2
  ) {
    this.observable$ = Observable.create((o: any) => {
      try {
        o.next('Hello');
        o.next('How are you?');
        setInterval(() => {
          o.next('I am good');
        }, 2000);
      } catch( error ) {
        o.error(error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.textObserver = this.observable$.subscribe((data: string) => {
      const textContainer = this.renderer2.createElement('div');
      this.renderer2.setProperty(textContainer, 'id', 'text-container');
      const text = this.renderer2.createText(data);
      this.renderer2.appendChild(textContainer, text);
      this.renderer2.appendChild(this.oc.nativeElement, textContainer);
    });

    setTimeout(() => {
      this.textObserver.unsubscribe();
    }, 6001);

    this.initOperatorBufferEx();
  }

  ngOnInit(): void {
    this.initOperatorMergeEx();
    this.initOperatorMapEx();
    this.initOperatorAuditEx();
    this.initOperatorflatMapEx();
    this.initOperatorswitchMapEx();
    this.initIsEmptyAndTapOperator();
    this.initDebounceTimeOperator();
  }

  private initOperatorMergeEx(): void {
    // merge example
    const obs1: Observable<string> = of('Texto1');
    const obs2: Observable<number> = Observable.create(o => o.next(88));
    const resObs: Observable<string | number> = merge(obs1, obs2);
    resObs.subscribe((data: string | number) => {
      console.log(`%c MERGE operator: result ==>`, `color: greenyellow; background-color: black`, data);
    });
    // mergeAll example
    const obsA: Observable<Observable<Object>> = Observable.create(o => {
      o.next(of({
        value: 88
      }));
      o.next(of({
        value: 99
      }));
    });
    const obsB: Observable<Observable<boolean>> = Observable.create(o => o.next(of(true)));
    const resultMergeAll: Observable<any> = merge(obsA, obsB).pipe(mergeAll());
    resultMergeAll.subscribe(
      (result: any) => {
        console.log(`%c MERGEALL operator: result ==>`, `color: greenyellow; background-color: black`, result);
      }
    );
  }

  private initOperatorMapEx(): void {
    // map example
    const obs1: Observable<string> = Observable .create( o => {
      o.next('Soy');
      o.next('Crgio');
      o.next('Peca');
      o.next('88');
      o.complete();
    });
    const obsMap: Observable<Object> = obs1.pipe(
      map((text: string) => {
        return ({
          value: text.toUpperCase()
        });
      })
    );
    obsMap.subscribe((obj: Object) => {
      console.log(`%c MAP operator: result ==>`, `color: yellow; background-color: green`, obj);
    });

    // mapTo example
    const obsMapTo: Observable<Object> = obsMap.pipe(
      mapTo({
        username: 'crgio mapTo',
        password: 'crgio password'
      })
    );
    obsMapTo.subscribe((objMapTo: Object) => {
      console.log(`%c MAPTO operator: result ==>`, `color: yellow; background-color: green`, objMapTo);
    });
  }

  private initOperatorAuditEx(): void {
    // audit example
    const obs1: Observable<string> = interval(500).pipe(
      map((n: number) => {
        return (`Data test observable`);
      }),
      take(14)
    );
    const resultAudit: Observable<string> = obs1.pipe(
      audit((text: string) => {
        return interval(5000);
      })
    );
    resultAudit.subscribe((data: string) => {
      console.log(`%c AUDIT operator: result ==>`, `color: white; background-color: red`, data);
    });
  }

  private initOperatorflatMapEx(): void {
    // flatMap example
    function getNewObservable(text: string): Observable<number> {
      if(text === '88') {
        return of(88);
      } else {
        return of(null);
      }
    }
    const obs1: Observable<string> = Observable.create(o => {
      o.next('Soy');
      o.next('Crgio');
      o.next('Peca');
      o.next('88');
      o.complete();
    });
    const result: Observable<number> = obs1.pipe(
      flatMap((text: string) => {
        return getNewObservable(text);
      })
    );
    result.subscribe((n: number) => {
      if(typeof n === 'number') {
        console.log(`%c FLATMAP operator: result exam1 ==>`, `color: green; background-color: orange`, n);
      }
    });

    function getNewObservable2(t: string): Observable<string> {
      return interval(500).pipe(
        map((n)=>`interno ${n} ${t}`),
        take(2)
      );
    }
    const obs3: Observable<string> = interval(1000).pipe(
      map((n)=>`externo ${n}`),
      take(8)
    );
    const result2: Observable<string> = obs3.pipe(
      flatMap((t: string) => {
        return getNewObservable2(t);
      })
    );
    result2.subscribe((text: string) => {
      console.log(`%c FLATMAP operator: result exam2 ==>`, `color: green; background-color: orange`, text);
    });
  }

  private initOperatorswitchMapEx(): void {
    // switchMap example
    function getNewObservable(t: string): Observable<string> {
      return interval(500).pipe(
        map((n)=>`interno ${n} ${t}`),
        take(2)
      );
    }
    const obs1: Observable<string> = interval(1000).pipe(
      map((n)=>`externo ${n}`),
      take(8)
    );
    const result: Observable<string> = obs1.pipe(
      switchMap((t: string) => {
        return getNewObservable(t);
      })
    );
    result.subscribe((text: string) => {
      console.log(`%c SWITCHMAP operator: result ==>`, `color: yellow; background-color: blue`, text);
    });
  }

  private initOperatorBufferEx(): void {
    // audit example
    const obs1: Observable<number> = interval(2000).pipe(take(5));
    const clicksButton = fromEvent(this.bufferButton.nativeElement, 'click');
    const buffered = clicksButton.pipe(
      map((e) => {
        return ({event: 'click', testBuffer: true});
      }),
      buffer(obs1)
    );
    buffered.subscribe((buffData) => {
      console.log(`%c BUFFER operator: result ==>`, `color: yellow; background-color: purple`, buffData);
    });
  }

  private initIsEmptyAndTapOperator(): void {
    // isEmpty and Tap example
    const obs1: Observable<string> = Observable.create((o) => {
      o.complete();
    });
    const evalObs1: Observable<boolean> = obs1.pipe(isEmpty());
    const evalEmpty: Observable<boolean> = EMPTY.pipe(isEmpty());
    const result: Observable<boolean> = merge(evalObs1, evalEmpty).pipe(
      tap((r: boolean) => {
        const rmsg: string = (r === true) ? 'verdadero' : 'falso';
        console.log(`%c TAP operator: el resultado de la validaciòn es: `, `color: red; background-color: greenyellow`, rmsg);
      })
    );
    result.subscribe((result: boolean) => {
      console.log(`%c ISEMPTY operator: result ==>`, `color: red; background-color: greenyellow`, result);
    });
  }

  private initDebounceTimeOperator(): void {
    // debounceTime example
    const obs1: Observable<number> = interval(500).pipe(take(20));
    const result: Observable<number> = obs1.pipe(
      debounceTime(1000)
    );
    result.subscribe(r => console.log(`%c DEBOUNCETIME operator: result ==>`, `color: black; background-color: yellow`, r));
  }

}
