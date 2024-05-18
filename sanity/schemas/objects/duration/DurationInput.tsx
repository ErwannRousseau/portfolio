import { Box, Flex, Text } from "@sanity/ui";
import { ArrowRight } from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  type FieldMember,
  MemberField,
  type ObjectInputProps,
  type RenderFieldCallback,
} from "sanity";

export function DurationInput(props: ObjectInputProps) {
  const { members, renderInput, renderItem, renderPreview } = props;

  const fieldMembers = useMemo(
    () => members.filter((mem) => mem.kind === "field") as FieldMember[],
    [members],
  );

  const start = fieldMembers.find((mem) => mem.name === "start");
  const end = fieldMembers.find((mem) => mem.name === "end");
  const current = fieldMembers.find((mem) => mem.name === "current");

  const renderField: RenderFieldCallback = useCallback(
    (props) => props.children,
    [],
  );

  const renderProps = useMemo(
    () => ({ renderField, renderInput, renderItem, renderPreview }),
    [renderField, renderInput, renderItem, renderPreview],
  );

  return (
    <Flex align="center" gap={3}>
      <Box flex={1}>
        {start && <MemberField {...renderProps} member={start} />}
      </Box>
      {current && <MemberField {...renderProps} member={current} />}
      {!current?.field.value && (
        <>
          <Flex>
            <Text muted>
              <ArrowRight />
            </Text>
          </Flex>
          <Box flex={1}>
            {end && <MemberField {...renderProps} member={end} />}
          </Box>
        </>
      )}
    </Flex>
  );
}
