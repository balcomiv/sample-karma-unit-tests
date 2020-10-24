import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

const mockUsers = [
  { name: 'Bob', website: 'www.yesssss.com' },
  { name: 'Juliette', website: 'nope.com' },
];

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    dataService = TestBed.inject(DataService); // Get DataService. Don't forget, it was provided in root.
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  /**
   * HttpClient Testing
   *
   * @description HttpClient testing still uses the Arrange, Act, Assert pattern
   * but it will look a little different because of the subscription.
   */
  it('should demonstrate testing of HttpClient', () => {
    //  dataService.getDataRandom().subscribe();  //  Uncomment to see the VERIFY catch the extra call and fail the test
    //  dataService.getData().subscribe();        //  Uncomment to see the EXPECT ONE catch the extra call and fail the test

    dataService.getData().subscribe((data) => {
      console.log(data);

      //  Assert Response Data
      expect(data).toEqual(mockUsers);
    });

    //  Assert only called once
    const mockReq = httpTestingController.expectOne(
      'http://jsonplaceholder.typicode.com/users'
    );

    //  Assert anything else we need to for the request
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    //  Set the fake data to be returned by the mock return request
    mockReq.flush(mockUsers);

    //  Assert we got only the exact call we expected. No extraneous calls.
    httpTestingController.verify();
  });
});

//  https://netbasal.com/testing-asynchronous-code-in-angular-using-fakeasync-fc777f86ed13
