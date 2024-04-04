const supportedDevices = [
    // | 最早名称 |      显示名称      |
    [   'Android',  'Android'         ],
    [       'iOS',  'iOS/iPad'        ],
    [  'Windows7',  'Windows 7/8/8.1' ],
    [ 'Windows10',  'Windows 10/11'   ],
    [     'macOS',  'macOS'           ],
];
DOMDeviceList.show();

$('#launcher-container').html(DOMLauncherList.deviceList());

const deviceChanged = (() => {
    $('.device-diff select').each((index, element) => {
        $(element).hide();
        const select = $('.' + $('#device').val());
        select.val('【待选择】');
        select.show();
    });
    try { launcherChanged(); } catch (e) {}
});
$('#device').change(deviceChanged);

const launcherChanged = (() => {
    for (const attribute of ['data-download', 'data-dev-download', 'data-url']) {
        const target = $(event.target)[0][$(event.target)[0].selectedIndex];
        const button = $(`.${attribute}-launcher`);
        let URL = $(target).attr(attribute);
        if (attribute.endsWith('download')) {
            if ($('#proxy').is(':checked') && String(URL).startsWith('https://github.com/')) {
                URL = 'https://mirror.ghproxy.com/' + URL;
            }
            const downloadSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="56"></path></svg>';
            if (attribute == 'data-download') {
                const version = $(target).attr('data-version');
                button.html(downloadSVG + '下载最新稳定版');
                button.attr('title', '下载尽可能新的稳定正式版');
                if (version != 'latest') {
                    button.html(downloadSVG + '下载稳定版 ' + version);
                    button.attr('title', '下载稳定正式版 ' + version);
                }
            } else {
                const devVersion = $(target).attr('data-dev-version');
                button.html(downloadSVG + '下载最新开发版');
                button.attr('title', '下载尽可能新的开发测试版');
                if (devVersion != 'latest') {
                    button.html(downloadSVG + '下载开发版 ' + devVersion);
                    button.attr('title', '下载开发测试版 ' + devVersion);
                }
            }
        }
        button.hide();
        if (URL) {
            button.attr('href', URL);
            button.show();
        }
    }
});
$('.launcher').change(launcherChanged);

const proxyChanged = (() => {
    if ($('#proxy').is(':checked')) {
        $('.launcher-download>a.button').each((index, element) => {
            const link = $(element).attr('href');
            if (link.startsWith('https://github.com/')) $(element).attr('href', 'https://mirror.ghproxy.com/' + link);
        });
    } else {
        $('.launcher-download>a.button').each((index, element) => {
            $(element).attr('href', $(element).attr('href').replace(/^https:\/\/mirror\.ghproxy\.com\//, ''));
        });
    }
});
$('#proxy').change(proxyChanged);
