import { Component, VERSION, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angularss ' + VERSION.major;
  dataInput = [
    'Enter uid1234 Spiderman',
    'Leave uid1234',
    'Enter uid1234 Hulk',
    'Leave uid1234'
  ];
  relationData = [
    ['100', 'spiderman', 'music', '2'],
    ['200', 'ironman', 'math', '2']
  ];

  ngOnInit(): void {
    // this.solution(this.dataInput);
    // this.stringCompression('ababcdcdababcdcd');
    // this.countSameKey(this.relationData);
    // this.stringChallenge(4.5);
  }

  stringChallenge(str) {
    var rating = Number(str);
    var fixedRating = Math.ceil(rating);
    str = '';

    for (var i = 1; i <= 5; i++) {
      if (rating >= i) {
        str += 'full ';
      } else if (
        rating === rating &&
        rating % 1 !== 0 &&
        Number(fixedRating) >= i
      ) {
        str += 'half ';
      } else {
        str += 'empty ';
      }
    }
    console.log(str);
    return str;
  }

  solution(record): Array<any> {
    var answer = [];
    if (record && record.length > 0) {
      var recordMapping = [];
      var statusMapping = [];
      for (var i = 0; i < record.length; i++) {
        let idx = recordMapping.findIndex(
          rec => rec.id === record[i].split(' ')[1]
        );

        if (idx === -1) {
          recordMapping.push({
            status: [
              {
                index: i,
                uid: record[i].split(' ')[1],
                statusName: record[i].split(' ')[0]
              }
            ],
            id: record[i].split(' ')[1],
            nickname:
              record[i].split(' ')[0] === 'Leave' ? '' : record[i].split(' ')[2]
          });
        } else {
          if (record[i].split(' ')[0] === 'Change') {
            recordMapping[idx].nickname = record[i].split(' ')[2];
          } else if (
            record[i].split(' ')[0] === 'Enter' &&
            record[i].split(' ')[1] === recordMapping[idx].id
          ) {
            recordMapping[idx].nickname = record[i].split(' ')[2];
            recordMapping[idx].status.push({
              index: i,
              uid: record[i].split(' ')[1],
              statusName: record[i].split(' ')[0]
            });
          } else {
            recordMapping[idx].status.push({
              index: i,
              uid: record[i].split(' ')[1],
              statusName: record[i].split(' ')[0]
            });
          }
        }
      }

      for (var j = 0; j < recordMapping.length; j++) {
        for (var x = 0; x < recordMapping[j].status.length; x++) {
          statusMapping.push(recordMapping[j].status[x]);
        }
      }
      statusMapping.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));

      for (var k = 0; k < statusMapping.length; k++) {
        let idx = recordMapping.findIndex(
          rec => rec.id === statusMapping[k].uid
        );
        if (idx !== -1) {
          switch (statusMapping[k].statusName) {
            case 'Enter':
              answer.push(recordMapping[idx].nickname + ' came in');
              break;
            case 'Leave':
              answer.push(recordMapping[idx].nickname + ' has left');
              break;
          }
        }
      }
    }
    console.log(answer, 'hasil');
    return answer;
  }

  stringCompression(str): number {
    var answer = 0;
    var output = '';
    if (str.length > 0) {
      var devide = str.length / 2;
      var mod = str.length % 2;
      console.log(str.length);
      var count = 0;
      for (var i = 0; i < str.length; i++) {
        count++;
        // if (str[i] != str[i + 1]) {
        //   output += (count > 1 ? count : '') + str[i];
        //   count = 0;
        // }
        if (str.slice(i, i + 2) != str.slice(i + 2, i + 4)) {
          output += (count > 1 ? count : '') + str[i];
          count = 0;
        }
      }
      answer = output.length;
    }
    console.log(answer, output);
    return answer;
  }

  countSameKey(relation): number {
    var answer = 0;
    var counts = {};
    if (relation && relation.length > 0) {
      for (var i = 0; i < relation.length; i++) {
        if (counts[relation[i][1]]) {
          counts[relation[i][1]] += 1;
        } else {
          counts[relation[i][1] + '-' + relation[i][0]] = 1;
        }
      }

      var objVal = Object.keys(counts);
      for (let i = 0; i < objVal.length; i++) {
        let idx = objVal.findIndex(
          rec =>
            rec.split('-')[0] === objVal[i].split('-')[0] &&
            rec.split('-')[1] !== objVal[i].split('-')[1]
        );
        if (idx !== -1) {
          answer += 1;
        }
      }
    }
    return answer;
  }
}
