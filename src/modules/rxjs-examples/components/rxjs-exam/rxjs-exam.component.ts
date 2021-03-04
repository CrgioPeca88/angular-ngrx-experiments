// Dependencies
import { Component, ElementRef, Renderer2, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Observable, Subscription, of, interval, merge, pipe, OperatorFunction, fromEvent,
  EMPTY, concat } from 'rxjs';
import { mergeAll, map, mapTo, flatMap, switchMap, audit, take, buffer, isEmpty,
  tap, debounceTime, filter, delay } from 'rxjs/operators';

interface Person {
  age: number;
  idType?: string;
}

class User implements Person {
  constructor(public username: string, public age: number, public idType?: string) {}
}

class Admin implements Person {
  constructor(public id: string, public age: number, public idType?: string) {}
}

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
    this.initFilterOperator();
    this.initCustomOperators();
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

  private initFilterOperator(): void {
    // filter example
    const obs1: Observable<User> = Observable.create( (s) => {
      s.next({ username: 'Sergio', age: 29 });
      s.next({ username: 'Peña', age: 16 });
      s.next({ username: 'Cardozo', age: 15 });
      s.next({ username: 'Angie', age: 28 });
      s.next({ username: 'Viviana', age: 10 });
      s.next({ username: 'Garcia', age: 11 });
    });
    const result: Observable<User> =  obs1.pipe(
      filter((user: User) => user.age > 18)
    );
    result.subscribe((user: User) => {
      console.log(`%c FILTER operator: result ==>`, `color: black; background-color: pink`, user);
    });
  }

  private initCustomOperators(): void {
    // Custom Operator
    const customOpIdType: () => OperatorFunction<Person, Person> = () => pipe(
      delay(2000),
      map((p: Person) => {
        if (p.age >= 18) {
          return {...p, idType: 'CC'};
        } else {
          return {...p, idType: 'TI'};
        }
      })
    );

    const mockData: User[] = [
      { username: 'Sergio', age: 29 },
      { username: 'Peña', age: 15 },
      { username: 'Angie', age: 28 },
      { username: 'Viviana', age: 17 },
      { username: 'Garcia', age: 18 },
    ];

    const mockData2: Admin[] = [
      { id: 'Admin-001', age: 29 },
      { id: 'Admin-002', age: 15 },
      { id: 'Admin-003', age: 28 },
      { id: 'Admin-004', age: 17 },
      { id: 'Admin-005', age: 18 },
    ];

    const result: Observable<User> = of(...mockData).pipe(
      map((user: User) => {
        return {...user, username: `${user.username}__`};
      }),
      customOpIdType(),
      map((p: Person) => p as User)
    );

    const result2: Observable<Admin> = of(...mockData2).pipe(
      customOpIdType(),
      map((p: Person) => p as Admin)
    );

    concat(result, result2).subscribe((p: Person) => console.log(`%c CUSTOM operator: result ==>`, `color: greenyellow; background-color: blue`, p));
  }


}
