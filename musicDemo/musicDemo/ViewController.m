//
//  ViewController.m
//  musicDemo
//
//  Created by wgz on 2016/12/19.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import "ViewController.h"

#define kCellHeight 60
static NSString *identifyCell = @"MusicTableViewCell";
@interface ViewController ()<UITableViewDelegate,UITableViewDataSource>
@property(nonatomic,strong) UITableView *tableView;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    //添加音乐接口
    [self addPlayList];
    
    //1、初始化tableView
    [self buildTableView];

}

-(void)viewWillAppear:(BOOL)animated
{
    [self.tableView reloadData];
}

-(void)buildTableView{
    CGRect rect = [UIScreen mainScreen ].applicationFrame;
    self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0,20, rect.size.width, rect.size.height)];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.tableView registerClass:[MusicTableViewCell class] forCellReuseIdentifier:identifyCell];
    [self.tableView setSeparatorStyle:UITableViewCellSeparatorStyleNone];
    [self.view addSubview:self.tableView];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.playListArray.count;
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return kCellHeight;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    MusicTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifyCell];
    if (!cell) {
        cell = [[MusicTableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:identifyCell];
        
    }
    cell.musicName = self.playListArray[indexPath.row];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    self.player = [[LXPlayerViewController alloc] init];
    self.player.str = self.playListArray[indexPath.row];
    self.player.playListArray = self.playListArray;
    self.player.index = (int)indexPath.row;
    [self presentModalViewController:self.player animated:YES];
}

-(void) addPlayList
{
    if (_playListArray == nil)
    {
        _playListArray = [[NSMutableArray array] init];
    }
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgZXiKAFdd-ACdixndNDmM948.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/00/17/wKgMDldiGGqAR0NkAB0-p8Kgyl4039.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/FA/wKgMG1gyQ3KAcSG2ACqs8xt8O6Q470.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/00/36/wKgMG1egSZaAWev6ADw3gDfe__s816.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/04/58/wKgMFlg2nZSALHHTACg7IYvjJoA347.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/04/58/wKgMFlg2nViAV6TSACMpoeaD66M460.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/04/3D/wKgMG1g2nSWAAIQaAEMPoYVKEGQ230.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/04/3D/wKgMG1g2nO6Af_eLADdQIVcaKwI395.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/04/58/wKgMFlg2nLuARu7lADDQoUyxdfI204.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/04/58/wKgMFlg2nF6ATXaFAEIJIYzLC-E425.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/04/3D/wKgMG1g2nBaAKuTJAC30ofx2Jy4493.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/04/3D/wKgMG1g2m7yAankPAD0noUUxoxU638.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/04/58/wKgMFlg2m3KATFhSADKgIVTmESw083.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/04/58/wKgMFlg2mbeAenXQADK1IStijys957.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/03/13/wKgMFlgyR1uAGR1WACBedAZCU6M974.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/03/13/wKgMFlgyRlGAAx6tACXXRbhW-1I413.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/FA/wKgMG1gyQ3KAcSG2ACqs8xt8O6Q470.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/02/FA/wKgMG1gyQmaAFtVcABrDWjStgqY996.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/02/FA/wKgMG1gup9KAOo3FAAs_ylx9A8I911.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/03/12/wKgMFlgupoSAWNdlACZ7kyoblGQ966.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/F6/wKgMG1gudKSADVKZABysChgoeoA830.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/03/0E/wKgMFlguUouAAxY6ACoXzlSHJVk168.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/02/F6/wKgMG1gtdP-ADDHhABYIjbAWSEQ657.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/03/0D/wKgMFlgtcSiAcsPRABG4ztNuzlE425.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/F6/wKgMG1gtcM-AaydHAAuxtpfKgGs171.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/02/F6/wKgMG1gtVfyAbRRbABoKiiLwXP0616.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/03/0D/wKgMFlgtCRSAZBFqACb5DuTtjaI633.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/03/0D/wKgMFlgsIQ-AK6vpAE-9k9-kwfg947.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/03/0D/wKgMFlgsIHuAMHtAAGf0N0EquiM250.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/02/F6/wKgMG1gsH-GAGLdhADURiRa2Lq8710.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/03/0D/wKgMFlgsHvmAa13aACTDRgB5L-U615.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/02/F6/wKgMG1gsHnuAFZ5OACsEdVvMDp0192.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/F5/wKgMG1gqyUGALWftABqfykxLd3I647.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/03/0D/wKgMFlgqwcSAf7GWABUdICOFcEQ788.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/02/F5/wKgMG1gqwVyAZiLJABMn8AIFlIA135.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/02/F5/wKgMG1gqwJOAV3PbAD0perE7nhA154.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/03/0D/wKgMFlgqv5GAOdd7AHm_M9SPUdM021.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/00/04/wKgMDldiDXSARB7ZAEB2-GgVo34671.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/03/0D/wKgMFlgqu5WANpIfADsoARkPc1U875.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/02/F5/wKgMG1gqubOAf4stADm5FH_BupI286.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/02/F5/wKgMG1gqt4GAYfEHAFGtW5WwMMU444.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/03/0D/wKgMFlgqtyeAZq__AB-BSqBvFGA506.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/03/0D/wKgMFlgqtXyAQV_8AChOTkDMxSo882.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/03/0C/wKgMFlgqYvaAdhacAC_pBu3r2so331.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/02/F5/wKgMG1gqYm6AEzKLAAoTMjTeEIs805.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/02/F5/wKgMG1gqYm6AEzKLAAoTMjTeEIs805.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/02/ED/wKgMG1glQYyAOeWDACWDMESKhM4126.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/D1/wKgMG1ggP8aAFWfiADm-k8BAI_Y169.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/EE/wKgMFlggJ6iAGZ3BAIjaLbt_bjo126.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlggJZGAFlQhAHgIrPFps08250.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/D1/wKgMG1ggJIeATCXMACHohbTPPmA531.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/D1/wKgMG1gf9eGAfK6NABYuFpkovHU982.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgf9NCAft1eABtsKgEj5-0044.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgf9JKADFCZABfL-jPzmOg458.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/D0/wKgMG1gf9CiAesTWABKVDhdl-TQ277.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/D0/wKgMG1gf89iACt6MABb5TsjOpZE872.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgf84mAHaarAC4kWMZvc54378.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgf8zaAVgXAADtgIV0Thqw855.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/D0/wKgMG1gf8p2AN6f_ABduEq5DNu4617.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/D0/wKgMG1gf8j6AWyoeABnnksb1Ttw106.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgf7vmAJ72bADUXxVN9-k0469.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/D0/wKgMG1gf7hKAL70FAJOp9VBhehA927.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/D0/wKgMG1gf6lyASJjBABS0zlA0IOQ756.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/D0/wKgMG1gfy02AIesqABhDIWmSLqE343.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgcQeOAcwZUAJG5LSIEwsg489.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgcQWeAe-tjAJgf7T1HscY697.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/CE/wKgMG1gcQMCACvRJAIX17fv2qkQ536.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/CE/wKgMG1gcQFGAHrUjADhJ6-dIHYY275.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgcP32AL5FbAI0FbTQvyx4482.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgcPb-AYb2oADTFLQ6nDSo238.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/CE/wKgMG1gcPPiAQXw2ABAKlXNcILE576.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgcO9aAbLBIACuWYEmmErY167.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CE/wKgMG1gcOtKAOlWcAEu74HB4yMs370.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/CE/wKgMG1gb-PKADY7JAA_ttYBaaKM328.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgb-AyAYaDGAFvB_fd6C8s035.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/CE/wKgMG1gb9zuAX-I-ACu_TdMV1cM868.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/CE/wKgMG1gb9maAfu08ACFUxzAzKzw229.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgb9ZeAQeRTAC6DLaW88SQ108.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgb9QCAI6DCABIJrYSvx5s511.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/CE/wKgMG1gb9IeAebY3ADbTBbjbL0A512.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/CE/wKgMG1gb9BWAD4ocAB9v4cYiLRE492.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgb8fCAYynlAHzTZLaChS8776.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgb8XeAcYWFACZIK5wAbak284.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/CE/wKgMG1gb8SCATG-uACVeSo1ldPM333.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CE/wKgMG1gb8KuATzFkADvUflHkQBU404.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgb8EmAQ0xYADLMp0ETpIY327.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/ED/wKgMFlgb78eAGjPRACzwP8Z8iG4093.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CE/wKgMG1gb7wOAKh3rACjJZNK8LyM329.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/CD/wKgMG1gb7iiAPjBxADKOneHjW20932.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/ED/wKgMFlgb7X6AbiyqACr8p4uP7-s669.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgb6eWAeqIPACt4VyVacd4934.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/CD/wKgMG1gb6GWAQfuVAD2qT1sFWFY668.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/CD/wKgMG1gb54KAYyLwAC0FIirAFSU726.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/ED/wKgMFlgb5piAXd2IAHmPBqffQCE791.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgauQaAGLoqAEwiODL5gUA741.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CD/wKgMG1gauByAUq3xAEzElz82Xlc573.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CD/wKgMG1gauByAUq3xAEzElz82Xlc573.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/ED/wKgMFlgZXiKAFdd-ACdixndNDmM948.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/CD/wKgMG1gZV3uAUS7dAC_P8CYhL58724.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/CD/wKgMG1gZVuGAD0qGADkV0JfpaY0565.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M00/01/ED/wKgMFlgZVb6AR8ZdAEYlfTipZyA116.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M02/01/ED/wKgMFlgZVUeAE7eZAD2eoSHuBhQ657.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M03/01/CD/wKgMG1gZVLWALhbcADa5u-q-8qI003.mp3"];
    [_playListArray addObject:@"http://yfile.yongzin.com/yyfile/M01/01/CD/wKgMG1gZUwKAWOi5ADsJRqFQpiE960.mp3"];
    
    
}


@end
