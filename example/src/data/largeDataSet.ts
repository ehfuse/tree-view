import type { TreeItem } from "@ehfuse/tree-view";

export const largeDataSet: TreeItem[] = [
    {
        id: "board",
        label: "게시판 관리",
        children: [
            {
                id: "notice",
                label: "공지사항",
                parentId: "board",
                remark: "중요 공지",
                children: [
                    {
                        id: "notice-read",
                        label: "공지사항 조회",
                        parentId: "notice",
                    },
                    {
                        id: "notice-write",
                        label: "공지사항 쓰기",
                        parentId: "notice",
                    },
                    {
                        id: "notice-edit",
                        label: "공지사항 수정",
                        parentId: "notice",
                    },
                    {
                        id: "notice-delete",
                        label: "공지사항 삭제",
                        parentId: "notice",
                    },
                ],
            },
            {
                id: "free",
                label: "자유게시판",
                parentId: "board",
                children: [
                    {
                        id: "free-read",
                        label: "자유게시판 조회",
                        parentId: "free",
                    },
                    {
                        id: "free-write",
                        label: "자유게시판 쓰기",
                        parentId: "free",
                    },
                    {
                        id: "free-edit",
                        label: "자유게시판 수정",
                        parentId: "free",
                    },
                    {
                        id: "free-delete",
                        label: "자유게시판 삭제",
                        parentId: "free",
                    },
                ],
            },
            {
                id: "qna",
                label: "Q&A",
                parentId: "board",
                children: [
                    { id: "qna-read", label: "Q&A 조회", parentId: "qna" },
                    { id: "qna-write", label: "Q&A 쓰기", parentId: "qna" },
                    { id: "qna-answer", label: "Q&A 답변", parentId: "qna" },
                    { id: "qna-delete", label: "Q&A 삭제", parentId: "qna" },
                ],
            },
        ],
    },
    {
        id: "member",
        label: "회원 관리",
        children: [
            {
                id: "user",
                label: "사용자 관리",
                parentId: "member",
                children: [
                    { id: "user-list", label: "사용자 목록", parentId: "user" },
                    {
                        id: "user-detail",
                        label: "사용자 상세",
                        parentId: "user",
                    },
                    {
                        id: "user-create",
                        label: "사용자 등록",
                        parentId: "user",
                    },
                    { id: "user-edit", label: "사용자 수정", parentId: "user" },
                    {
                        id: "user-delete",
                        label: "사용자 삭제",
                        parentId: "user",
                    },
                ],
            },
            {
                id: "role",
                label: "역할 관리",
                parentId: "member",
                children: [
                    { id: "role-list", label: "역할 목록", parentId: "role" },
                    { id: "role-create", label: "역할 생성", parentId: "role" },
                    { id: "role-edit", label: "역할 수정", parentId: "role" },
                    { id: "role-delete", label: "역할 삭제", parentId: "role" },
                ],
            },
            {
                id: "permission",
                label: "권한 관리",
                parentId: "member",
                children: [
                    {
                        id: "perm-view",
                        label: "권한 조회",
                        parentId: "permission",
                    },
                    {
                        id: "perm-assign",
                        label: "권한 할당",
                        parentId: "permission",
                    },
                    {
                        id: "perm-revoke",
                        label: "권한 회수",
                        parentId: "permission",
                    },
                ],
            },
        ],
    },
    {
        id: "member-copy",
        label: "회원 관리 (복사본)",
        remark: "동일 ID 동기화 테스트",
        children: [
            {
                id: "user",
                label: "사용자 관리",
                parentId: "member-copy",
                children: [
                    { id: "user-list", label: "사용자 목록", parentId: "user" },
                    {
                        id: "user-detail",
                        label: "사용자 상세",
                        parentId: "user",
                    },
                    {
                        id: "user-create",
                        label: "사용자 등록",
                        parentId: "user",
                    },
                    { id: "user-edit", label: "사용자 수정", parentId: "user" },
                    {
                        id: "user-delete",
                        label: "사용자 삭제",
                        parentId: "user",
                    },
                ],
            },
            {
                id: "role",
                label: "역할 관리",
                parentId: "member-copy",
                children: [
                    { id: "role-list", label: "역할 목록", parentId: "role" },
                    { id: "role-create", label: "역할 생성", parentId: "role" },
                    { id: "role-edit", label: "역할 수정", parentId: "role" },
                    { id: "role-delete", label: "역할 삭제", parentId: "role" },
                ],
            },
            {
                id: "permission",
                label: "권한 관리",
                parentId: "member-copy",
                children: [
                    {
                        id: "perm-view",
                        label: "권한 조회",
                        parentId: "permission",
                    },
                    {
                        id: "perm-assign",
                        label: "권한 할당",
                        parentId: "permission",
                    },
                    {
                        id: "perm-revoke",
                        label: "권한 회수",
                        parentId: "permission",
                    },
                ],
            },
        ],
    },
    {
        id: "system",
        label: "시스템 관리",
        children: [
            {
                id: "code",
                label: "코드 관리",
                parentId: "system",
                remark: "공통코드",
                children: [
                    { id: "code-list", label: "코드 목록", parentId: "code" },
                    { id: "code-create", label: "코드 등록", parentId: "code" },
                    { id: "code-edit", label: "코드 수정", parentId: "code" },
                    { id: "code-delete", label: "코드 삭제", parentId: "code" },
                ],
            },
            {
                id: "menu",
                label: "메뉴 관리",
                parentId: "system",
                children: [
                    { id: "menu-list", label: "메뉴 목록", parentId: "menu" },
                    { id: "menu-tree", label: "메뉴 트리", parentId: "menu" },
                    { id: "menu-create", label: "메뉴 등록", parentId: "menu" },
                    { id: "menu-edit", label: "메뉴 수정", parentId: "menu" },
                    { id: "menu-delete", label: "메뉴 삭제", parentId: "menu" },
                ],
            },
            {
                id: "log",
                label: "로그 관리",
                parentId: "system",
                children: [
                    { id: "log-access", label: "접속 로그", parentId: "log" },
                    { id: "log-work", label: "작업 로그", parentId: "log" },
                    { id: "log-error", label: "에러 로그", parentId: "log" },
                    { id: "log-audit", label: "감사 로그", parentId: "log" },
                ],
            },
        ],
    },
    {
        id: "statistics",
        label: "통계 관리",
        children: [
            {
                id: "visit",
                label: "방문 통계",
                parentId: "statistics",
                children: [
                    {
                        id: "visit-daily",
                        label: "일별 통계",
                        parentId: "visit",
                    },
                    {
                        id: "visit-weekly",
                        label: "주별 통계",
                        parentId: "visit",
                    },
                    {
                        id: "visit-monthly",
                        label: "월별 통계",
                        parentId: "visit",
                    },
                ],
            },
            {
                id: "content",
                label: "콘텐츠 통계",
                parentId: "statistics",
                children: [
                    {
                        id: "content-post",
                        label: "게시글 통계",
                        parentId: "content",
                    },
                    {
                        id: "content-comment",
                        label: "댓글 통계",
                        parentId: "content",
                    },
                    {
                        id: "content-popular",
                        label: "인기글 통계",
                        parentId: "content",
                    },
                ],
            },
        ],
    },
];
